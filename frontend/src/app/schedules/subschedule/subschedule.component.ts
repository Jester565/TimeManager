import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { SubSchedule } from '../schedule';
import _ from 'lodash';
import { StaticRangeInterface } from '../rangeTypes/range.interface';
import { PeriodComponent } from '../rangeTypes/period/period.component';

@Component({
  selector: 'app-subschedule',
  templateUrl: './subschedule.component.html',
  styleUrls: ['./subschedule.component.css']
})
export class SubscheduleComponent implements OnInit {
  periodType: StaticRangeInterface = PeriodComponent;
  private _dows = null;
  private _subschedule : SubSchedule;

  @Output()
  subscheduleChange = new EventEmitter<SubSchedule>();

  @Input()
  get subschedule(){
    return this._subschedule;
  }

  set subschedule(val) {
    this._subschedule = val;
    this.subscheduleChange.emit(this._subschedule);
  }

  private _activities: string[];

  @Output()
  activitiesChange = new EventEmitter<string[]>();

  @Input()
  get activities(){
    return this._activities;
  }

  set activities(val) {
    this._activities = val;
    this.activitiesChange.emit(this._activities);
  }

  constructor() { }

  ngOnInit(): void {
  }

  onName(name) {
    let newSubschedule = _.clone(this.subschedule);
    newSubschedule.name = name;
    this.subschedule = newSubschedule;
  }

  onDaysOfWeek(daysOfWeek) {
    this._dows = daysOfWeek;
  }

  onDowOpenChange(open) {
    if (!open && this._dows) {
      let newSubschedule = _.clone(this.subschedule);
      newSubschedule.daysOfWeek = this._dows;
      this._dows = null;
      this.subschedule = newSubschedule;
    }
  }

  onPeriods(periods) {
    if (periods != null) {
      let newSubschedule = _.clone(this.subschedule);
      newSubschedule.periods = periods;
      this.subschedule = newSubschedule;
    }
  }
}
