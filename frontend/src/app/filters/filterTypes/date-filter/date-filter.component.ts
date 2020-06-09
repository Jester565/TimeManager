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
  @Input() filterConfig;

  constructor() { }

  ngOnInit(): void {
  }

}
