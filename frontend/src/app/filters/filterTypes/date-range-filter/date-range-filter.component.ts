import { Component, OnInit, Input } from '@angular/core';
import { staticImplements } from '../../../common/static';
import { StaticFilterInterface, FilterInterface } from '../filter.interface';
import moment from 'moment';
import { Range } from 'src/app/schedules/schedule';
import { FilterDateCreatorComponent } from '../../filter-date-creator/filter-date-creator.component';

@Component({
  selector: 'app-date-range-filter',
  templateUrl: './date-range-filter.component.html',
  styleUrls: ['./date-range-filter.component.css']
})
@staticImplements<StaticFilterInterface>()
export class DateRangeFilterComponent implements FilterInterface {
  static Name = "Date Range Filter";
  static TypeID = "date-range-filter";
  static ExecuteFilter(filter): Range {
    let startDate = FilterDateCreatorComponent.ToDate(filter.startDateFilter);
    let endDate = FilterDateCreatorComponent.ToDate(filter.endDateFilter);
    let start = startDate.startOf('day').unix();
    let end = endDate.endOf('day').unix();
    return { start, end };
  }

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