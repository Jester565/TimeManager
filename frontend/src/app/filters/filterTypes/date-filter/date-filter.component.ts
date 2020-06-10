import { Component, OnInit, Input } from '@angular/core';
import { FilterInterface, StaticFilterInterface } from '../filter.interface';
import { staticImplements } from '../../../common/static';

@Component({
  selector: 'app-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.css']
})
@staticImplements<StaticFilterInterface>()
export class DateFilterComponent implements FilterInterface {
  static Name = "Date Filter";
  static TypeID = "date-filter";
  
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
