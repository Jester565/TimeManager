import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Range } from '../schedule';
import _ from 'lodash';
import { StaticRangeInterface } from '../rangeTypes/range.interface';

@Component({
  selector: 'app-range-list',
  templateUrl: './range-list.component.html',
  styleUrls: ['./range-list.component.css']
})
export class RangeListComponent implements OnInit {
  @Input() rangeType: StaticRangeInterface;

  private _ranges : Range[] = null;

  @Output()
  rangesChange = new EventEmitter<Range[]>();

  @Input()
  get ranges(){
    return this._ranges;
  }

  set ranges(val) {
    console.log(this._ranges, val);
    if (!_.isEqual(this._ranges, val)) {
      this._ranges = val;
      console.log("RANGES: ", this._ranges);
      this.rangesChange.emit(this._ranges);
    }
  }

  private _extras: any;

  @Output()
  extrasChange = new EventEmitter<any>();

  @Input()
  get extras(){
    return this._extras;
  }

  set extras(val) {
    this._extras = val;
    this.extrasChange.emit(this._extras);
  }

  constructor() { }

  ngOnInit(): void {
  }

  onAdd() {
    let newRanges = _.clone(this.ranges);
    newRanges.push(this.rangeType.GetDefaultData());
    //_.sortBy(newRanges, ['start']);
    this.ranges = newRanges;
  }

  onDataChange(data, i) {
    let newRanges = _.clone(this.ranges);
    newRanges[i] = data;
    //_.sortBy(newRanges, ['start']);
    this.ranges = newRanges;
  }

  onRemove(i) {
    let newRanges = _.clone(this.ranges);
    newRanges.splice(i, 1);
    this.ranges = newRanges;
  }
}
