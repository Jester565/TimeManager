import { Component, OnInit, Input } from '@angular/core';
import { staticImplements } from '../../../common/static';
import { StaticFilterInterface, FilterInterface } from '../filter.interface';

@Component({
  selector: 'app-date-range-filter',
  templateUrl: './date-range-filter.component.html',
  styleUrls: ['./date-range-filter.component.css']
})
@staticImplements<StaticFilterInterface>()
export class DateRangeFilterComponent implements FilterInterface {
  static Name = "Date Range Filter";
  static TypeID = "date-range-filter";

  private _filterConfig: any = null;
  get filterConfig(): any {
    return this._filterConfig;
  }

  @Input('filterConfig')
  set filterConfig(val: any) {
    if (val.startDateFilter == null) {
      val.startDateFilter = {
        method: "date",
        date: null,
        daysAgo: 0
      };
    }
    if (val.endDateFilter == null) {
      val.endDateFilter = {
        method: "date",
        date: null,
        daysAgo: 0
      };
    }
    this._filterConfig = val;
  }

  constructor() {}
}