import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { SubSchedule } from '../schedule';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';

@Component({
  selector: 'app-subschedule-list',
  templateUrl: './subschedule-list.component.html',
  styleUrls: ['./subschedule-list.component.css']
})
export class SubscheduleListComponent implements OnInit {
  private _subschedules : SubSchedule[];

  @Output()
  subschedulesChange = new EventEmitter<SubSchedule[]>();

  @Input()
  get subschedules(){
    return this._subschedules;
  }

  set subschedules(val) {
    this._subschedules = val;
    this.subschedulesChange.emit(this._subschedules);
  }

  constructor() { }

  ngOnInit(): void {
  }

  onAdd() {
    let newSubschedules = _.clone(this.subschedules);
    newSubschedules.push({
      id: uuidv4(),
      name: "Your Subschedule",
      daysOfWeek: [],
      periods: []
    });
    this.subschedules = newSubschedules;
  }

  onSubschedule(subschedule, i) {
    let newSubschedules = _.clone(this.subschedules);
    newSubschedules[i] = subschedule;
    this.subschedules = newSubschedules;
  }

  onDelete(i) {
    let newSubschedules = _.clone(this.subschedules);
    newSubschedules.splice(i, 1);
    this.subschedules = newSubschedules;
  }

  identify(index, item) {
    return item.id; // or item.id
  }
}
