import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Range } from '../../schedule';
import moment from 'moment';
import _ from 'lodash';
import { staticImplements } from 'src/app/common/static';
import { StaticRangeInterface, RangeInterface } from '../range.interface';

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.css']
})
@staticImplements<StaticRangeInterface>()
export class DateRangeComponent implements OnInit, RangeInterface {
  static GetDefaultData(): any {
    return {
      start: null,
      end: null
    }
  }

  get startMoment(): any {
    if (this._data && this._data.start) {
      let utc = moment.unix(this._data.start).utc(false);
      return utc;
    }
    return null;
  }

  get endMoment(): any {
    if (this._data && this._data.end) {
      let utc = moment.unix(this._data.end).utc(false);
      return utc;
    }
    return null;
  }

  private _data: any;

  @Output()
  dataChange = new EventEmitter<any>();

  @Input()
  get data() {
    return this._data;
  }

  set data(val) {
    this._data = val;
    this.dataChange.emit(this._data);
  }

  @Output()
  extrasChange = new EventEmitter<any>();

  @Input()
  get extras(){
    return null;
  }
  set extras(val) {

  }

  constructor() { }

  ngOnInit(): void {
  }

  onStartDate(date) {
    let timestamp = date.utc(true).unix();
    let newDateRange = _.clone(this.data);
    newDateRange.start = timestamp;
    this.data = newDateRange;
  }

  onEndDate(date) {
    let timestamp = date.utc(true).unix();
    let newDateRange = _.clone(this.data);
    newDateRange.end = timestamp;
    this.data = newDateRange;
  }
}
