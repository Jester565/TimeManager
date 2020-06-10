import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

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
    return (this.config && this.config.date)? moment.unix(this.config.date): null;
  }

  @Input() config: FilterDate

  constructor() { }

  ngOnInit(): void {
    console.log("FilterDate: ", this.config);
  }

  onDate(date) {
    let timestamp = date.unix();
    this.config.date = timestamp;
  }
}
