import { Component, OnInit, Input } from '@angular/core';
import { FilterInterface, StaticFilterInterface } from '../filter.interface';
import { staticImplements } from '../../../common/static';
import { Range } from 'src/app/schedules/schedule';

@Component({
  selector: 'app-none-filter',
  templateUrl: './none-filter.component.html',
  styleUrls: ['./none-filter.component.css']
})
@staticImplements<StaticFilterInterface>()
export class NoneFilterComponent implements FilterInterface {
  static Name = "No Filter";
  static TypeID = "no-filter";
  static ExecuteFilter(filter): Range {
    return { start: null, end: null };
  }
  
  @Input() filterConfig;

  constructor() {}
}