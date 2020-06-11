import { Component, OnInit, Input } from '@angular/core';
import { StaticRangeInterface } from '../rangeTypes/range.interface';
import { DateRangeComponent } from '../rangeTypes/date-range/date-range.component';
import { Observable, Subject } from 'rxjs';
import { debounceTime, map, finalize, flatMap, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Schedule } from '../schedule';
import _ from 'lodash';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  @Input() scheduleID;
  private _schedule: Schedule = null;
  
  get schedule(): Schedule {
    return this._schedule;
  }

  set schedule(val) {
    this._schedule = val;
    this._firebaseUpdateSubject.next(val);
  }

  private _firebaseUpdateSubject = new Subject();
  private _userDoc: AngularFirestoreDocument<any>;

  dateRangeType: StaticRangeInterface = DateRangeComponent;
  private _scheduleI: number = 0;
  private _schedules: Schedule[];

  constructor(public auth: AngularFireAuth, private afs: AngularFirestore) { }

  ngOnInit(): void {
    this.auth.user.subscribe((user) => {
      this._userDoc = this.afs.doc<any>(`users/${user.uid}`);
      this._userDoc.valueChanges().subscribe((user) => {
        this._schedules = user.schedules;
        this._scheduleI = _.findIndex(user.schedules, { id: this.scheduleID });
        if (!this._schedule) {
          this._schedule = user.schedules[this._scheduleI];
        }
      });
    });
    this._firebaseUpdateSubject.pipe(
      debounceTime(2000),
      distinctUntilChanged(),
      switchMap((schedule: any) => {
        let newSchedules = _.clone(this._schedules);
        newSchedules[this._scheduleI] = schedule;
        return this._userDoc.set({
          schedules: newSchedules
        }, { merge: true });
      })
    ).subscribe((res) => {
      console.log("FirebaseUpdate subject");
    });
  }

  onName(name) {
    let newSchedule = _.clone(this.schedule);
    newSchedule.name = name;
    this.schedule = newSchedule;
  }

  onDateRange(dateRange) {
    let newSchedule = _.clone(this.schedule);
    newSchedule.range = dateRange;
    this.schedule = newSchedule;
  }

  onExceptions(exceptions) {
    let newSchedule = _.clone(this.schedule);
    newSchedule.exceptions = exceptions;
    this.schedule = newSchedule;
  }

  onSubschedules(subschedules) {
    let newSchedule = _.clone(this.schedule);
    newSchedule.subSchedules = subschedules;
    this.schedule = newSchedule;
  }
}
