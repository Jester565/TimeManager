import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { RangeInterface, StaticRangeInterface } from '../range.interface';
import { staticImplements } from 'src/app/common/static';
import { parseSecondsInDay, timeStrToSeconds } from 'src/app/common/dateUtils';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import _ from 'lodash';

@Component({
  selector: 'app-period',
  templateUrl: './period.component.html',
  styleUrls: ['./period.component.css']
})
@staticImplements<StaticRangeInterface>()
export class PeriodComponent implements OnInit, RangeInterface {
  static GetDefaultData(): any {
    return {
      start: null,
      end: null,
      activity: null
    }
  }

  get startTime() {
    if (this.data && (this.data.start != null)) {
      let parsed = parseSecondsInDay(this.data.start);
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
    this._data = val;
    this.dataChange.emit(this._data);
  }

  constructor() { }

  ngOnInit(): void {
  }

  onStartTime(timeStr: string) {
    console.log("TIME STR: ", timeStr);
    let newData = _.clone(this.data);
    newData.start = timeStrToSeconds(timeStr);
    console.log("START: ", newData.start);
    return newData;
  }

  onEndTime(timeStr: string) {
    let newData = _.clone(this.data);
    newData.end = timeStrToSeconds(timeStr);
    return newData;
  }
}
