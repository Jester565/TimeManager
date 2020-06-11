import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { staticImplements } from 'src/app/common/static';
import { StaticRangeInterface, RangeInterface } from '../range.interface';

@Component({
  selector: 'app-activity-period',
  templateUrl: './activity-period.component.html',
  styleUrls: ['./activity-period.component.css']
})
@staticImplements<StaticRangeInterface>()
export class ActivityPeriodComponent implements OnInit, RangeInterface {
  static GetDefaultData(): any {
    return {
      start: null,
      end: null,
      activity: null,
      note: null
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
}
