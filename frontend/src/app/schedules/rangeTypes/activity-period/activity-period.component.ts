import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { staticImplements } from 'src/app/common/static';
import { StaticRangeInterface, RangeInterface } from '../range.interface';
import { v4 as uuidv4 } from 'uuid';
import { MatDialog } from '@angular/material/dialog';
import moment from 'moment';
import { parseSecondsInDay, timeStrToSeconds } from 'src/app/common/dateUtils';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import _ from 'lodash';
import { NameDialog } from 'src/app/app-common/name-dialog';

@Component({
  selector: 'app-activity-period',
  templateUrl: './activity-period.component.html',
  styleUrls: ['./activity-period.component.css']
})
@staticImplements<StaticRangeInterface>()
export class ActivityPeriodComponent implements OnInit, RangeInterface {
  static GetDefaultData(): any {
    return {
      id: uuidv4(),
      start: moment().utc(true).unix(),
      end: null,
      activities: {},
      note: null
    }
  }

  initStartTime: string;
  initEndTime: string;

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
    let firstSet = (this._data == null && val);
    this._data = val;
    this.dataChange.emit(this._data);
  }

  @Output() extrasChange = new EventEmitter<any>();
  @Input() extras;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onStartTime(timeStr: string) {
    let newData = _.clone(this.data);
    let secondsIntoDay = timeStrToSeconds(timeStr);
    let dayStart = moment.unix(this.data.start).utc(false).startOf('day').unix();
    newData.start = dayStart + secondsIntoDay;
    if (this.data.end != null) {
      let endDayStart = moment.unix(this.data.end).utc(false).startOf('day').unix();
      let endSecondsIntoDay = this.data.end - endDayStart;
      if (endSecondsIntoDay < secondsIntoDay) {
        newData.end += (24 * 60 * 60);
      } else if (endDayStart > dayStart) {
        newData.end -= (24 * 60 * 60);
      }
    }
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
    this.data.end = end;
    this.data = newData;
  }

  onDate(date) {
    let dayStart = date.utc(true).startOf("day").unix();
    let newDateRange = _.clone(this.data);
    
    if (this.data.start) {
      let prevDayStart = moment.unix(this.data.start).utc(false).startOf('day').unix();
      let startSecondsIntoDay = this.data.start - prevDayStart;
      newDateRange.start = dayStart + startSecondsIntoDay;
      if (this.data.end) {
        let endSecondsIntoDay = this.data.end - prevDayStart;
        newDateRange.end = dayStart + endSecondsIntoDay;
      }
    } else {
      newDateRange.start = dayStart;
    }
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
}
