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
    WidgetConfigDirective
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    FlexLayoutModule,
    NgReduxModule,
    BrowserAnimationsModule,
    BrowserModule
  ],
  exports: [
    WidgetComponent,
    WidgetConfigComponent
  ],
  entryComponents: [...(widgetComponents as any[])]
})
export class WidgetsModule { }
