import { StaticFilterInterface } from './filter.interface';
import { DateFilterComponent } from './date-filter/date-filter.component';
import { DateRangeFilterComponent } from './date-range-filter/date-range-filter.component';
import { NoneFilterComponent } from './none-filter/none-filter.component';

export const filterComponents: StaticFilterInterface[] = [
    DateFilterComponent,
    DateRangeFilterComponent,
    NoneFilterComponent
]