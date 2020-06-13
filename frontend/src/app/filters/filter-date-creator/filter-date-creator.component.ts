import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment-timezone';

export interface FilterDate {
  method: string,
  date: number,
  daysAgo: number
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
      return moment().utc(true).subtract(config.daysAgo, 'days');
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
