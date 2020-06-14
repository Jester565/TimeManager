import { Component, OnInit, Input, OnDestroy, EventEmitter, Output } from '@angular/core';
import { staticImplements } from 'src/app/common/static';
import { StaticWidgetInterface, WidgetInterface } from '../widget.interface';
import { ActivityPeriodService } from 'src/app/activity-period.service';
import { Subscription, BehaviorSubject, Observable, interval } from 'rxjs';
import moment from 'moment';
import {v4 as uuidv4} from'uuid';
import _ from 'lodash';
import { Widget } from 'src/app/redux/dashboards';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-clocker-widget',
  templateUrl: './clocker-widget.component.html',
  styleUrls: ['./clocker-widget.component.css']
})
@staticImplements<StaticWidgetInterface>()
export class ClockerWidgetComponent implements WidgetInterface, OnInit, OnDestroy {
  subscription: Subscription = null;
  activityPeriod: BehaviorSubject<any>;
  changingActivityPeriod: boolean = false;
  activityPeriodActivities: Observable<string[]>;
  lastChange = new BehaviorSubject<string>(null);
  nowChangeDiff = new BehaviorSubject<string>(null);

  static Name = "Clock In & Out";
  static TypeID = "clocker";
  @Input() dashboardID;
  @Input() widgetID;
  @Input() filter;
  private _widget: Widget;
  get widget() {
    return this._widget
  }
  @Input('widget')
  set widget(val) {
    this._widget = val;
  }
  @Output() widgetChange = new EventEmitter<Widget>();

  changeMinsAgo: number = 0;
  note: string = "";
  activities: string[] = [];

  private _getChangeTime() {
    return moment().utc(true).subtract(this.changeMinsAgo, 'minutes').unix();
  }

  private _addActivityPeriod() {
    let activities = {};
    for (let activity of this.widget.config.activities) {
      activities[activity] = true;
    }
    this.activityPeriodService.setActivityPeriod({
      activities: activities,
      start: this._getChangeTime(),
      end: null,
      note: (this.note && this.note.length > 0)? this.note: null,
      userID: null,
      id: uuidv4()
    });
  }
  
  private _completeActivityPeriod() {
    let recentActivityPeriod = this.activityPeriod.value;
    let modifiedActivityPeriod = _.cloneDeep(recentActivityPeriod);
    modifiedActivityPeriod.end = this._getChangeTime();
    if (this.note && this.note.length > 0) {
      modifiedActivityPeriod.note = this.note;
    }
    this.activityPeriodService.setActivityPeriod(modifiedActivityPeriod);
  }

  constructor(private activityPeriodService: ActivityPeriodService, private auth: AngularFireAuth, private afs: AngularFirestore) {
    auth.user.subscribe((user) => {
      if (user && user.uid) {
        afs.doc(`/users/${user.uid}`).valueChanges().subscribe((userData: any) => {
          this.activities = userData.activities;
        });
      }
    })
  }

  ngOnInit(): void {
    this.activityPeriod = this.activityPeriodService.mostRecentSubject;
    this.activityPeriodActivities = this.activityPeriodService.mostRecentSubject.pipe(
      map((activityPeriod) => { return Object.keys(activityPeriod.activities) }));
    this.subscription = this.activityPeriodService.mostRecentSubject.subscribe((activityPeriod) => {
      if (activityPeriod) {
        if (this.changingActivityPeriod) {
          this.changeMinsAgo = 0;
          this.note = "";
          this.changingActivityPeriod = false;
        }
      }
      this.updateTimeDiff();
    });
    this.startTimeInterval();
  }

  updateTimeDiff() {
    let activityPeriod = this.activityPeriod.value;
    if (activityPeriod) {
      let lastChangeTime = (activityPeriod.end != null)? activityPeriod.end: activityPeriod.start;
      if (lastChangeTime != null) {
        let now = moment().utc(true); 
        let lastChangeMoment = moment.unix(lastChangeTime).utc(false);
        this.lastChange.next(lastChangeMoment.format("hh:mm a"));
        let msDiff = now.diff(lastChangeMoment);
        let d = moment.duration(msDiff);
        let formattedDiff = Math.floor(d.asHours()) + moment.utc(msDiff).format(":mm:ss");
        this.nowChangeDiff.next(formattedDiff);
        return;
      }
    }
    this.lastChange.next(null);
    this.nowChangeDiff.next(null);
  }

  startTimeInterval() {
    const source = interval(1000);
    source.subscribe(val => {
      this.updateTimeDiff();
    });
  }

  public onClock() {
    let recentActivityPeriod = this.activityPeriod.value;
    if (recentActivityPeriod.end != null) {
      this._addActivityPeriod();
    } else {
      this._completeActivityPeriod();
    }
    this.changingActivityPeriod = true;
  }

  public onActivities(activities) {
    let widget = _.cloneDeep(this.widget);
    widget.config.activities = activities;
    this._widget = widget;
    this.widgetChange.emit(widget);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
