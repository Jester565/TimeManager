import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment-timezone';
import { ConfigurableFocusTrapConfig } from '@angular/cdk/a11y/focus-trap/configurable-focus-trap-config';

export interface FilterDate {
  method: string,
  date: number,
  daysAgo: number,
  dow: 1,
  weeksAgo: 0
}

@Component({
  selector: 'app-filter-date-creator',
  templateUrl: './filter-date-creator.component.html',
  styleUrls: ['./filter-date-creator.component.css']
})
export class FilterDateCreatorComponent implements OnInit {
  static ToDate(config): any {
    if (config.method == "today") {
      return moment().utc(true);
    } else if (config.method == "daysAgo") {
      return (config.daysAgo)? moment().utc(true).subtract(config.daysAgo, 'days'): moment().utc(true);
    } else if (config.method == "dow") {
      let dow = moment().utc(true).day();
      let dowDiff = 0;
      let configDow = (config.dow)? config.dow: 0;
      if (configDow <= dow) {
        dowDiff = (dow - configDow);
      } else {
        dowDiff = dow + (6 - configDow);
      }
      let dayDiff = ((config.weeksAgo)? config.weeksAgo: 0) * 7 + dowDiff;
      return moment().utc(true).subtract(dayDiff, 'days');
    } else {
      return (config.date)? moment.unix(config.date).utc(false): null
    }
  }
  get configDate(): any {
    if (this.config && this.config.date) {
      let utc = moment.unix(this.config.date).utc(false);
      return utc;
    }
    return null;
  }

  @Input() config: FilterDate

  constructor() { }

  ngOnInit(): void {
  }

  onDate(date) {
    let timestamp = date.utc(true).unix();
    this.config.date = timestamp;
  }
}
