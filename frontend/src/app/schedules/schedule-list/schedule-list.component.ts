import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, merge } from 'rxjs';
import { Schedule } from '../schedule';
import { AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore/public_api';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import moment from 'moment';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';

function CreateDefaultSchedule(): Schedule {
  return {
    id: uuidv4(),
    name: "Your Schedule",
    range: {
      start: moment().utc(true).unix(),
      end: null
    },
    exceptions: [],
    subSchedules: [{
      id: uuidv4(),
      name: "SubSchedule 1",
      daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
      periods: []
    }]
  };
}

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.css']
})
export class ScheduleListComponent implements OnInit {
  private _selectedScheduleID : string;

  @Output()
  selectedScheduleIDChange = new EventEmitter<string>();

  @Input()
  get selectedScheduleID(){
    return this._selectedScheduleID;
  }

  set selectedScheduleID(val) {
    this._selectedScheduleID = val;
    this.selectedScheduleIDChange.emit(this._selectedScheduleID);
  }
  
  private _schedules: Schedule[] = null;
  editting: boolean = false;
  scheduleCollection: AngularFirestoreCollection<Schedule>;
  schedules: Observable<Schedule[]>;
  userDoc: AngularFirestoreDocument<any>;

  constructor(public auth: AngularFireAuth, private afs: AngularFirestore) {
    
  }

  ngOnInit(): void {
    this.auth.user.subscribe((user) => {
      if (user != null) {
        this.userDoc = this.afs.doc<any>(`users/${user.uid}`);
        this.userDoc.valueChanges().subscribe((user) => {
          this._schedules = user.schedules;
        });
        this.schedules = this.userDoc.valueChanges().pipe(
          map((user) => user.schedules)
        );
        //this.scheduleCollection = this.userDoc.collection<Schedule>("schedules");
        //this.schedules = this.scheduleCollection.valueChanges();
      }
    })
  }

  onEditToggle() {
    this.editting = !this.editting;
  }

  onAddSchedule() {
    let newSchedule = CreateDefaultSchedule();
    this._schedules.push(newSchedule);
    this.userDoc.set({
      schedules: this._schedules
    }, { merge: true });
  }

  onDeleteSchedule(schedule) {
    _.remove(this._schedules, { id: schedule.id });
    this.userDoc.set({ schedules: this._schedules }, { merge: true });
  }

  drop(event: CdkDragDrop<Schedule[]>) {
    moveItemInArray(this._schedules, event.previousIndex, event.currentIndex);
    this.userDoc.set({ schedules: this._schedules }, { merge: true });
  }

  onScheduleSelect(schedule) {
    this.selectedScheduleID = schedule.id;
  }
}
