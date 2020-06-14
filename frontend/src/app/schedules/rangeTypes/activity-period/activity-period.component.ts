import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { staticImplements } from 'src/app/common/static';
import { StaticRangeInterface, RangeInterface } from '../range.interface';
import { v4 as uuidv4 } from 'uuid';
import { MatDialog } from '@angular/material/dialog';
import moment from 'moment';
import { parseSecondsInDay, timeStrToSeconds } from 'src/app/common/dateUtils';
import { NgxMaterialTimepickerTheme, NgxTimepickerFieldComponent } from 'ngx-material-timepicker';
import _ from 'lodash';
import { NameDialog } from 'src/app/app-common/name-dialog';

@Component({
  selector: 'app-activity-period',
  templateUrl: './activity-period.component.html',
  styleUrls: ['./activity-period.component.css']
})
@staticImplements<StaticRangeInterface>()
export class ActivityPeriodComponent implements OnInit, RangeInterface {
  @ViewChild('startComponent') private startComponent: NgxTimepickerFieldComponent;
  @ViewChild('endComponent') private endComponent: NgxTimepickerFieldComponent;

  private focused: boolean = false;
  
  static GetDefaultData(): any {
    return {
      id: uuidv4(),
      start: moment().utc(true).unix(),
      end: null,
      activities: {},
      note: null
    }
  }
  

  get activitiesArr() {
    return Object.keys(this._data.activities);
  }

  get startMoment() {
    return (this.data && this.data.start != null)? moment.unix(this.data.start).utc(false): null;
  }

  get startTime() {
    if (this.data && (this.data.start != null)) {
      let utc = moment.unix(this.data.start).utc(false);
      return utc.format('hh:mm A');
    }
    return null;
  }

  get endTime() {
    if (this.data && (this.data.end != null)) {
      let utc = moment.unix(this._data.end).utc(false);
      return utc.format('hh:mm A');
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
    let prevData = this._data;
    this._data = val;
    if (!this.focused) { 
      this.dataChange.emit(this.data);
    }
    if (val != null && (prevData == null || (prevData.end == null && prevData.end != val.end))) {
      let et = this.endTime;
      if (et && this.endComponent) {
        this.endComponent.writeValue(et);
      }
    }
    if (val != null && (prevData == null || (prevData.start == null && prevData.start != val.start))) {
      let st = this.startTime;
      if (st && this.startComponent) {
        this.startComponent.writeValue(st);
      }
    }
  }

  @Output() extrasChange = new EventEmitter<any>();
  @Input() extras;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onStartTime(timeStr: string) {
    let newData = _.clone(this.data);
    let secondsIntoDay = timeStrToSeconds(timeStr);
    let start = secondsIntoDay;
    let dayStart = null;
    if (this.data.start) {
      dayStart = moment.unix(this.data.start).utc(false).startOf('day').unix();
      start = dayStart + secondsIntoDay;
      console.log("DAY START: ", dayStart, " secondsInto: ", secondsIntoDay, " start: ", start);
    }
    if (this.data.end != null) {
      let endDayStart = moment.unix(this.data.end).utc(false).startOf('day').unix();
      let endSecondsIntoDay = this.data.end - endDayStart;
      if (dayStart) {
        if (endSecondsIntoDay < secondsIntoDay) {
          newData.end = endSecondsIntoDay + dayStart + (24 * 60 * 60);
        } else {
          newData.end = endSecondsIntoDay + dayStart;
        }
      }
    }
    newData.start = start;
    console.log("ONSTART: ", newData.start, newData.end);
    this.data = newData;
  }

  onEndTime(timeStr: string) {
    let newData = _.clone(this.data);
    let secondsIntoDay = timeStrToSeconds(timeStr);
    let end = secondsIntoDay;
    if (this.data.start) {
      let dayStart = moment.unix(this.data.start).utc(false).startOf('day').add(secondsIntoDay).unix();
      end = dayStart + secondsIntoDay;
      if (end < this.data.start) {
        end += (24 * 60 * 60);
      }
    }
    newData.end = end;
    console.log("ONEND: ", newData.start, newData.end);
    this.data = newData;
  }

  onDate(date) {
    let dayStart = date.utc(true).startOf("day").unix();
    let newDateRange = _.clone(this.data);
    
    if (this.data.start) {
      let prevDayStart = moment.unix(this.data.start).utc(false).startOf('day').unix();
      let startSecondsIntoDay = this.data.start - prevDayStart;
      console.log("Start hours into day: ", startSecondsIntoDay / (60 * 60));
      newDateRange.start = dayStart + startSecondsIntoDay;
      if (this.data.end) {
        let endDayStart = moment.unix(this.data.end).utc(false).startOf('day').unix();
        let endSecondsIntoDay = this.data.end - endDayStart;
        if (dayStart) {
          if (endSecondsIntoDay < startSecondsIntoDay) {
            newDateRange.end = endSecondsIntoDay + dayStart + (24 * 60 * 60);
          } else {
            newDateRange.end = endSecondsIntoDay + dayStart;
          }
        }
        newDateRange.end = dayStart + endSecondsIntoDay;
      }
    } else {
      newDateRange.start = dayStart;
    }
    console.log("ONDATE: ", newDateRange.start, newDateRange.end);
    this.data = newDateRange;
  }

  setActivities(activitiesArr) {
    let newData = _.clone(this.data);
    newData.activities = {};
    for (let activity of activitiesArr) {
      newData.activities[activity] = true;
    }
    this.data = newData;
  }

  onFocus() {
    this.focused = true;
  }

  onUnfocus() {
    this.dataChange.emit(this.data);
    this.focused = false;
  }
}
