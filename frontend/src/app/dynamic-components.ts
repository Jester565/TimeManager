import { DateFilterComponent } from './date-filter/date-filter.component';
import { StaticFilterInterface } from './filter.interface';
import { NoneFilterComponent } from './none-filter/none-filter.component';
import { DateRangeFilterComponent } from './date-range-filter/date-range-filter.component';

export const filterComponents: StaticFilterInterface[] = [
    NoneFilterComponent,
    DateFilterComponent,
    DateRangeFilterComponent
]