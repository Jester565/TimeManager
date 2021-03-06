import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterDirective } from './filter.directive';
import { FilterDialog } from './filter-dialog/filter-dialog.component';
import { FilterComponent } from './filter/filter.component';
import { DateRangeFilterComponent } from './filterTypes/date-range-filter/date-range-filter.component';
import { DateFilterComponent } from './filterTypes/date-filter/date-filter.component';
import { NoneFilterComponent } from './filterTypes/none-filter/none-filter.component';
import { filterComponents } from './filterTypes/filterTypes';
import { AppMaterialModule } from '../app-material-module/app-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FilterDateCreatorComponent } from './filter-date-creator/filter-date-creator.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    FilterDirective,
    FilterDialog,
    FilterComponent,
    DateRangeFilterComponent,
    DateFilterComponent,
    NoneFilterComponent,
    FilterDateCreatorComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    FlexLayoutModule,
    FormsModule
  ],
  exports: [
    FilterDialog,
    FilterComponent,
    NoneFilterComponent
  ],
  entryComponents: [ ...(filterComponents as any[]) ]
})
export class FiltersModule { }
