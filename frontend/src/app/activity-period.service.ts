import { Injectable } from '@angular/core';
import { Subject, Observable, Subscription, BehaviorSubject, ReplaySubject } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { debounceTime, groupBy, mergeAll, map } from 'rxjs/operators';
import _ from 'lodash';
import { query } from '@angular/animations';

interface ActivityPeriod {
  id: string;
  userID: string;
  start: number;
  end: number;
  note: string;
  activities: { [key: string]: any };
  shouldIgnore: boolean;
}

interface ActivityPeriodData {
  id: string;
  userID: string;
  start: number;
  end: number;
  note: string;
  activities: { [key: string]: any };
}

interface ActivityPeriodSubscription {
  start: number;
  end: number;
  subject: BehaviorSubject<ActivityPeriod[]>;
  initDataPromise: Promise<any>;
  ready: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ActivityPeriodService {
  private _activityPeriods: { [key: string]: ActivityPeriodData } = {};
  private _subscriptions: ActivityPeriodSubscription[] = [];
  private _mostRecentUnsub: any;
  private _mostRecent: ActivityPeriodData;
  private _userPromise: Promise<string>;
  private _userDoc: AngularFirestoreDocument<any>;
  private _setActivityPeriodSubject = new Subject<ActivityPeriodData>();
  private _userID;

  private _getActivityPeriods(start: number, end: number) {
    return new Promise((resolve, reject) => {
      this._userPromise.then(() => {
        let req = this.afs.collection<ActivityPeriodData>("/activityPeriods", ref => {
          let query = ref.where("userID", "==", this._userID);
          if (start != null) {
            query = query.where("start", ">=", start);
          }
          if (end != null) {
            query = query.where("start", "<=", end);
          }
          return query.orderBy("start", "desc");
        });
        req.get().subscribe((queryRes) => {
          for (let doc of queryRes.docs) {
            this._activityPeriods[doc.id] = (doc.data() as ActivityPeriodData);
          }
          resolve();
        });
      });
    });
  }

  private _subRecent() {
    this._userPromise.then(() => {
      this._userDoc.valueChanges().subscribe((user) => {
        if (user.recentActivityPeriod) {
          if (this._mostRecent == null || this._mostRecent.id != user.recentActivityPeriod.id) {
            //Unsubscribe if the last period ended and a subscription exists
            if (this._mostRecentUnsub) {
              this._mostRecentUnsub();
            }
            let unsubscribe = user.recentActivityPeriod.onSnapshot((snapshot) => {
              if (snapshot.data() != null) {
                let data = snapshot.data();
                if (this._mostRecent != null && (data.start == null || data.start < this._mostRecent.start)) {

                  this.findSetRecentActivityPeriod();
                }
                this._mostRecent = data;
                this._localSetActivityPeriod(data);
                //unsubscribe from itself if ended and is no longer the most recent subscription
                if (this._mostRecent.end && this._mostRecentUnsub != unsubscribe) {
                  unsubscribe();
                }
              } else {
                this.findSetRecentActivityPeriod();
              }
            });
            this._mostRecentUnsub = unsubscribe;
          }
        }
      });
    });
  }

  private _localSetActivityPeriod(newActivityPeriod: any) {
    let activityPeriod = this._activityPeriods[newActivityPeriod.id];
    if (activityPeriod != null) {
      if (!_.isEqual(activityPeriod, newActivityPeriod)) {
        _.merge(activityPeriod, newActivityPeriod);
        this._updateSubscriptions();
      }
    } else {
      this._activityPeriods[newActivityPeriod.id] = newActivityPeriod;
      this._updateSubscriptions();
    }
  }

  private _initSetActivityPeriod() {
    this._userPromise.then((userID) => {
      this._setActivityPeriodSubject.pipe(
        groupBy(item => item.id,
          null,
          null,
          () => new ReplaySubject()),
        map(group => group.pipe(
          debounceTime(1000),
        )),
        mergeAll()
      ).subscribe((activityPeriod: any) => {
        activityPeriod.userID = userID;
        let activityPeriodDoc = this.afs.doc(`/activityPeriods/${activityPeriod.id}`);
        activityPeriodDoc.set(activityPeriod, { merge: true }).then(() => {
          if (activityPeriod.start != null) {
            if (!this._mostRecentUnsub || (this._mostRecent && 
            this._mostRecent.start < activityPeriod.start)) {
              this._userDoc.set({
                recentActivityPeriod: activityPeriodDoc.ref
              }, {merge: true});
            }
          }
        });
      });
    });
  }

  private _remoteSetActivityPeriod(activityPeriod: ActivityPeriodData) {
    if (activityPeriod != null) {
      this._setActivityPeriodSubject.next(activityPeriod);
    }
  }

  private _updateSubscriptions() {
    let sortedActivityPeriods = _.sortBy(Object.values(this._activityPeriods), ['start']);
    for (let sub of this._subscriptions) {
      if (sub.ready) {
        let arr = [];
        for (let activityPeriod of sortedActivityPeriods) {
          if ((activityPeriod.start >= sub.start || sub.start == null)
           && (activityPeriod.start <= sub.end || sub.end == null)) {
            arr.push(activityPeriod);
          }
        }
        sub.subject.next(arr);
      }
    }
  }

  constructor(public auth: AngularFireAuth, private afs: AngularFirestore) {
    this._userPromise = new Promise<string>((resolve, reject) => {
      let sub = this.auth.user.subscribe((user) => {
        if (user && user.uid) {
          this._userID = user.uid;
          this._userDoc = this.afs.doc(`/users/${this._userID}`)
          sub.unsubscribe();
          resolve(user.uid);
        }
      });
    });
    this._initSetActivityPeriod();
    this._subRecent();
  }

  public mostRecentSubject: Subject<ActivityPeriodData> = new Subject<ActivityPeriodData>();
  
  public setActivityPeriod(activityPeriod: ActivityPeriodData) {
    this._remoteSetActivityPeriod(activityPeriod);
    this._localSetActivityPeriod(activityPeriod);
  }

  public deleteActivityPeriod(activityPeriodID: string) {
    delete this._activityPeriods[activityPeriodID];
    this._updateSubscriptions();
    this.afs.doc(`/activityPeriods/${activityPeriodID}`).delete();
  }

  public findSetRecentActivityPeriod() {
    let req = this.afs.collection<ActivityPeriodData>("/activityPeriods", ref => { 
      return ref.where("userID", "==", this._userID).orderBy("start", "desc");
    });
    req.get().subscribe((res) => {
      if (res.docs.length > 0) {
        this._userDoc.set({
          recentActivityPeriod: res.docs[0].ref
        }, { merge: true });
      } else {
        this._userDoc.set({
          recentActivityPeriod: null
        }, { merge: true });
      }
    });
  }

  public subscribe(start: number, end: number) {
    let initDataPromise = this._getActivityPeriods(start, end);
    let existingSub = _.find(this._subscriptions, { start, end });
    if (existingSub) {
      return existingSub.subject;
    }
    let subject = new BehaviorSubject<ActivityPeriod[]>(null);
    let activePeriodSub: ActivityPeriodSubscription = {
      start,
      end,
      initDataPromise,
      subject,
      ready: false
    }
    this._subscriptions.push(activePeriodSub);
    initDataPromise.then(() => {
      activePeriodSub.ready = true;
      this._updateSubscriptions();
    });
    return subject;
  }
}
