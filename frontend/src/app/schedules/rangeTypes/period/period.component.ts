import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { RangeInterface, StaticRangeInterface } from '../range.interface';
import { staticImplements } from 'src/app/common/static';
import { parseSecondsInDay, timeStrToSeconds } from 'src/app/common/dateUtils';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import _ from 'lodash';
import { MatDialog } from '@angular/material/dialog';
import { NameDialog } from 'src/app/app-common/app-common.module';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-period',
  templateUrl: './period.component.html',
  styleUrls: ['./period.component.css']
})
@staticImplements<StaticRangeInterface>()
export class PeriodComponent implements OnInit, RangeInterface {
  static GetDefaultData(): any {
    return {
      id: uuidv4(),
      start: null,
      end: null,
      activity: null
    }
  }

  initStartTime: string;
  initEndTime: string;

  get startTime() {
    if (this.data && (this.data.start != null)) {
      let parsed = parseSecondsInDay(this.data.start);
      console.log("Parsed start time: ", parsed);
      return `${parsed.aHour}:${parsed.minute} ${parsed.a}`;
    }
    return null;
  }

  get endTime() {
    if (this.data && (this.data.end != null)) {
      let parsed = parseSecondsInDay(this.data.end);
      return `${parsed.aHour}:${parsed.minute} ${parsed.a}`;
    }
    return null;
  }

  clockTheme: NgxMaterialTimepickerTheme = {
    container: {
      bodyBackgroundColor: 'black'
    },
    clockFace: {
      clockFaceBackgroundColor: 'black'
    }
  }

  private _data: any;

  @Output()
  dataChange = new EventEmitter<any>();

  @Input()
  get data(){
    return this._data;
  }

  set data(val) {
    let firstSet = (this._data == null && val);
    this._data = val;
    if (firstSet) {
      this.initStartTime = this.startTime;
      this.initEndTime = this.endTime;
    }
    this.dataChange.emit(this._data);
  }

  activities: string[] = null;

  @Output()
  extrasChange = new EventEmitter<any>();

  @Input()
  get extras(){
    return this.activities;
  }
  set extras(val) {
    this.activities = val;
    this.extrasChange.emit(this.activities);
  }

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onStartTime(timeStr: string) {
    console.log("TIME STR: ", timeStr);
    let newData = _.clone(this.data);
    newData.start = timeStrToSeconds(timeStr);
    console.log("START: ", newData.start);
    this.data = newData;
  }

  onEndTime(timeStr: string) {
    let newData = _.clone(this.data);
    newData.end = timeStrToSeconds(timeStr);
    this.data = newData;
  }

  onActivitySelect(val) {
    console.log("Activity Select: ", val);
    if (val == "add") {
      this.addActivity()
    } else {
      this.setActivity(val);
    }
  } 

  addActivity() {
    const dialogRef = this.dialog.open
    (NameDialog, {
      width: '600px',
      data: {
        title: `Add Activity`,
        label: 'Activity Name'
      }
    });
    
    dialogRef.afterClosed().subscribe(name => {
      if (name) {
        let newActivities = _.clone(this.activities);
        newActivities.push(name);
        this.extras = newActivities;
        this.setActivity(name);
      }
    })
  }

  setActivity(activity) {
    let newData = _.clone(this.data);
    newData.activity = activity;
    this.data = newData;
  }
}
