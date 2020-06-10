import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleListComponent } from './schedule-list/schedule-list.component';
import { ActivityPeriodComponent } from './activity-period/activity-period.component';
import { ActivityPeriodListComponent } from './activity-period-list/activity-period-list.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { AppMaterialModule } from '../app-material-module/app-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [ScheduleListComponent, ActivityPeriodComponent, ActivityPeriodListComponent, ScheduleComponent],
  imports: [
    CommonModule,
    AppMaterialModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    DragDropModule
  ],
  exports: [
    ScheduleListComponent
  ]
})
export class SchedulesModule { }
