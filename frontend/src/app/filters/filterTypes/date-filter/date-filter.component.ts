import { Component, OnInit, Input } from '@angular/core';
import { FilterInterface, StaticFilterInterface } from '../filter.interface';
import { staticImplements } from '../../../common/static';
import moment from 'moment';
import { Range } from 'src/app/schedules/schedule';
import { FilterDateCreatorComponent } from '../../filter-date-creator/filter-date-creator.component';

@Component({
  selector: 'app-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.css']
})
@staticImplements<StaticFilterInterface>()
export class DateFilterComponent implements FilterInterface {
  static Name = "Date Filter";
  static TypeID = "date-filter";
  static ExecuteFilter(filter): Range {
    let date = FilterDateCreatorComponent.ToDate(filter.dateFilter);
    let start = date.startOf('day').unix();
    let end = date.endOf('day').unix();
    return { start, end };
  }
  
  private _filterConfig: any = null;
  get filterConfig(): any {
    return this._filterConfig;
  }

  @Input('filterConfig')
  set filterConfig(val: any) {
    if (val.dateFilter == null) {
      val.dateFilter = {
        method: "date",
        date: null,
        daysAgo: 0
      };
    }
    this._filterConfig = val;
  }

  constructor() { }

  ngOnInit(): void {
    
  }
}
