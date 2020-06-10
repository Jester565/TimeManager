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
