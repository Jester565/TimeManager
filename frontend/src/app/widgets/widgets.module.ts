import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetComponent } from './views/widget/widget.component';
import { WidgetConfigComponent } from './configs/widget-config/widget-config.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppMaterialModule } from '../app-material-module/app-material.module';
import { NgReduxModule } from '@angular-redux/store';
import { LineChartWidgetConfigComponent } from './configs/configTypes/line-chart-widget-config/line-chart-widget-config.component';
import { CounterWidgetConfigComponent } from './configs/configTypes/counter-widget-config/counter-widget-config.component';
import { NoneWidgetConfigComponent } from './configs/configTypes/none-widget-config/none-widget-config.component';
import { NoneWidgetComponent } from './views/viewTypes/none-widget/none-widget.component';
import { LineChartWidgetComponent } from './views/viewTypes/line-chart-widget/line-chart-widget.component';
import { CounterWidgetComponent } from './views/viewTypes/counter-widget/counter-widget.component';
import { WidgetDirective } from './views/widget.directive';
import { WidgetConfigDirective } from './configs/widget-config.directive';
import { widgetComponents } from './views/viewTypes/widgetTypes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ActivityListWidgetComponent } from './views/viewTypes/activity-list-widget/activity-list-widget.component';
import { ActivityListWidgetConfigComponent } from './configs/configTypes/activity-list-widget-config/activity-list-widget-config.component';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { SchedulesModule } from '../schedules/schedules.module';
import { AngularResizedEventModule } from 'angular-resize-event';
import { ClockerWidgetComponent } from './views/viewTypes/clocker-widget/clocker-widget.component';
import { ClockerWidgetConfigComponent } from './configs/configTypes/clocker-widget-config/clocker-widget-config.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    WidgetComponent,
    WidgetConfigComponent,
    LineChartWidgetConfigComponent,
    CounterWidgetConfigComponent,
    NoneWidgetConfigComponent,
    NoneWidgetComponent,
    LineChartWidgetComponent,
    CounterWidgetComponent,
    WidgetDirective,
    WidgetConfigDirective,
    ActivityListWidgetComponent,
    ActivityListWidgetConfigComponent,
    ClockerWidgetComponent,
    ClockerWidgetConfigComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    FlexLayoutModule,
    NgReduxModule,
    BrowserAnimationsModule,
    BrowserModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    SchedulesModule,
    AngularResizedEventModule,
    FormsModule
  ],
  exports: [
    WidgetComponent,
    WidgetConfigComponent
  ],
  entryComponents: [...(widgetComponents as any[])]
})
export class WidgetsModule { }
