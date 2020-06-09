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
  @Input() filterConfig;

  constructor() {}
}