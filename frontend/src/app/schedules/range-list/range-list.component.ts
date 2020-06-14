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
  @Input() addTop: boolean;

  private _ranges : Range[] = null;

  @Output()
  rangesChange = new EventEmitter<Range[]>();

  @Output()
  rangeAdded = new EventEmitter<Range>();

  @Output()
  rangeChange = new EventEmitter<Range>();

  @Output()
  rangeDeleted = new EventEmitter<Range>();

  @Input()
  get ranges(){
    return this._ranges;
  }

  set ranges(val) {
    console.log("RANGES UPDATED: ", val);
    //if (!_.isEqual(this._ranges, val)) {
    this._ranges = val;
    this.rangesChange.emit(this._ranges);
    //}
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
    this.rangeAdded.emit(this.rangeType.GetDefaultData());
    this.ranges = newRanges;
  }

  onDataChange(data, i) {
    let newRanges = _.clone(this.ranges);
    newRanges[i] = data;
    //_.sortBy(newRanges, ['start']);
    this.rangeChange.emit(data);
    this.ranges = newRanges;
  }

  onRemove(i) {
    let newRanges = _.clone(this.ranges);
    let range = newRanges[i];
    this.rangeDeleted.emit(range);
    newRanges.splice(i, 1);
    this.ranges = newRanges;
  }

  identify(index, item) {
    return item.id; // or item.id
  }
}
