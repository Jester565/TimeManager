import { Injectable, ComponentFactoryResolver } from '@angular/core';
import { ActivityPeriodService } from './activity-period.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import _ from 'lodash';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import moment from 'moment';

function mergeSortedArrs(arr1, arr2, key) {
  let merged = [];
  let index1 = 0;
  let index2 = 0;
  let current = 0;

  while (current < (arr1.length + arr2.length)) {

    let isArr1Depleted = index1 >= arr1.length;
    let isArr2Depleted = index2 >= arr2.length;

    if (!isArr1Depleted && (isArr2Depleted || (arr1[index1][key] < arr2[index2][key]))) {
      merged[current] = arr1[index1];
      index1++;
    } else {
      merged[current] = arr2[index2];
      index2++;
    }

    current++;
  }

  return merged;
}

@Injectable({
  providedIn: 'root'
})
export class ActivityRateService {
  private _userID = null;
  private _userDoc: AngularFirestoreDocument = null;
  private _userSubject = null;
  private _userPromise: Promise<any> = null;
  private _subscriptions = {};

  _getSchedulesInRange(schedules, start, end) {
    let schedulesInRange = [];
    for (let schedule of schedules) {
      if ((schedule.range.end == null || schedule.range.end >= start) && (schedule.range.start <= end || end == null)) {
        schedulesInRange.push(schedule);
      }
    }
    return schedulesInRange;
  }

  _optimizeSchedule = (schedule) => {
    let optimizedSchedule = _.cloneDeep(schedule);
    for (let subschedule of optimizedSchedule.subSchedules) {
      let dows = _.fill(Array(7), false);
      for (let dow of subschedule.daysOfWeek) {
        dows[dow] = true;
      }
      subschedule.daysOfWeek = dows;
      subschedule.periods = _.sortBy(subschedule.periods, ['start']);
    }
    return optimizedSchedule;
  }

  //Start must be the start of a day, end is only accurate up till the end of the day
  _flattenSchedules(schedules, start, end) {
    let now = moment().utc(true).unix();
    let time = start;
    let dow = (Math.floor(time / 86400) + 4) % 7;
    let sortedSchedules = _.orderBy(this._getSchedulesInRange(schedules, start, end), ['start']);
    let optimizedSchedules = _.map(sortedSchedules, this._optimizeSchedule);
    let periods = [];
    for (let schedule of optimizedSchedules) {
      //Go over schedule day by day
      while ((schedule.range.end == null || time < schedule.range.end) && (time < now && time < end)) {
        let subschedule = _.find(schedule.subSchedules, (subschedule) => { return subschedule.daysOfWeek[dow] });
        if (subschedule != null) {
          for (let period of subschedule.periods) {
            periods.push({
              start: time + period.start,
              end: time + period.end,
              scheduledActivity: period.activity
            });
          }
        }
        time += (24 * 60 * 60);
        dow = (dow < 6)? (dow + 1): 0;
      }
    }
    return periods;
  }

  _flattenPeriods(periods: any[]) {
    let points = [];
    for (let i = 0; i < periods.length; i++) {
      let period = periods[i];
      if (period.start == null) {
        console.log("Period start null... ignoring");
        continue;
      }
      if (period.end == null && i < periods.length - 1) {
        console.log("No end to period thats not at the end of the array... ignoring");
        continue;
      }
      if (period.end != null && period.start >= period.end) {
        console.log("Period start was after its end, ignoring");
        continue;
      }
      let startPoint = {
        isStart: true,
        time: period.start,
        ...period
      };
      points.push(startPoint);
      if (period.end != null) {
        let endPoint = {
          isStart: false,
          time: period.end,
          ...period
        };
        points.push(endPoint);
      }
    }
    return points;
  }

  constructor(private auth: AngularFireAuth, private afs: AngularFirestore, private activityPeriodService: ActivityPeriodService) {
    this._userPromise = new Promise((resolve, reject) => {
      let subscription = auth.user.subscribe((user) => {
        if (user && user.uid) {
          subscription.unsubscribe();
          this._userID = user.uid;
          this._userDoc = afs.doc(`/users/${user.uid}`);
          this._userSubject = this._userDoc.valueChanges();
          resolve();
        }
      })
    })
  }

  subActivityRates(start: number, end: number) {
    let subject = new BehaviorSubject<any>(null);
    this._userPromise.then(() => {
      let activityPeriodSubject = this.activityPeriodService.subscribe(start, end);
      combineLatest(activityPeriodSubject, this._userSubject)
      .pipe(
        debounceTime(2000)
      )
      .subscribe((argArr) => {
        let activityPeriods = argArr[0] as any[];
        let user = argArr[1] as any;
        if (!user || !activityPeriods) {
          return;
        }
        let schedulePeriods = this._flattenSchedules(user.schedules, start, end);
        let activityPoints = this._flattenPeriods(activityPeriods);
        let schedulePoints = this._flattenPeriods(schedulePeriods);
        let points = _.concat(activityPoints, schedulePoints);
        points = _.sortBy(points, ['time']);
        let activityTrackers = {};
        for (let activity of user.activities) {
          activityTrackers[activity] = {
            time: 0,
            ratedAt: 0,
            rate: 0,
            scheduled: false,
            active: false
          };
        }
        let results = [];
        for (let point of points) {
          if (point.isStart) {
            if (point.scheduledActivity) {
              let activity = point.scheduledActivity;
              let tracker = activityTrackers[activity];
              tracker.time += tracker.rate * (point.time - tracker.ratedAt);
              tracker.ratedAt = point.time;
              tracker.scheduled = true;
              if (tracker.active) {
                tracker.rate = 0;
              } else {
                tracker.rate = 1;
              }
              results.push({
                time: point.time,
                activityTime: tracker.time,
                activity: activity,
                rate: tracker.rate
              });
            } else if (point.activities) {
              for (let activity in point.activities) {
                let tracker = activityTrackers[activity];
                tracker.time += tracker.rate * (point.time - tracker.ratedAt);
                tracker.ratedAt = point.time;
                tracker.active = true;
                if (tracker.scheduled) {
                  tracker.rate = 0;
                } else {
                  tracker.rate = -1;
                }
                results.push({
                  time: point.time,
                  activityTime: tracker.time,
                  activity: activity,
                  rate: tracker.rate
                });
              }
            }
          } else {
            if (point.scheduledActivity) {
              let activity = point.scheduledActivity;
              let tracker = activityTrackers[activity];
              tracker.time += tracker.rate * (point.time - tracker.ratedAt);
              tracker.ratedAt = point.time;
              tracker.scheduled = false;
              if (tracker.active) {
                tracker.rate = -1;
              } else {
                tracker.rate = 0;
              }
              results.push({
                time: point.time,
                activityTime: tracker.time,
                activity: activity,
                rate: tracker.rate
              });
            } else if (point.activities) {
              for (let activity in point.activities) {
                let tracker = activityTrackers[activity];
                tracker.time += tracker.rate * (point.time - tracker.ratedAt);
                tracker.ratedAt = point.time;
                tracker.active = false;
                if (tracker.scheduled) {
                  tracker.rate = 1;
                } else {
                  tracker.rate = 0;
                }
                results.push({
                  time: point.time,
                  activityTime: tracker.time,
                  activity: activity,
                  rate: tracker.rate
                });
              }
            }
          }
        }
        subject.next(results);
      });
    });
    return subject;
  }
}
