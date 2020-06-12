import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleListComponent } from './schedule-list/schedule-list.component';
import { ActivityPeriodComponent } from './rangeTypes/activity-period/activity-period.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { AppMaterialModule } from '../app-material-module/app-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SubscheduleListComponent } from './subschedule-list/subschedule-list.component';
import { SubscheduleComponent } from './subschedule/subschedule.component';
import { DateRangeComponent } from './rangeTypes/date-range/date-range.component';
import { RangeListComponent } from './range-list/range-list.component';
import { rangeComponents } from './rangeTypes/rangeTypes';
import { RangeWrapperComponent } from './range-wrapper/range-wrapper.component';
import { RangeDirective } from './range.directive';
import { BrowserModule } from '@angular/platform-browser';
import { PeriodComponent } from './rangeTypes/period/period.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';


@NgModule({
  declarations: [ScheduleListComponent, ActivityPeriodComponent, PeriodComponent, ScheduleComponent, SubscheduleListComponent, SubscheduleComponent, DateRangeComponent, RangeListComponent, RangeWrapperComponent, RangeDirective],
  imports: [
    NgxMaterialTimepickerModule,
    BrowserModule,
    CommonModule,
    AppMaterialModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    DragDropModule
  ],
  exports: [
    ScheduleListComponent,
    ScheduleComponent,
    RangeListComponent,
    ActivityPeriodComponent
  ],
  entryComponents: [ ...(rangeComponents as any[]) ]
})
export class SchedulesModule { }
