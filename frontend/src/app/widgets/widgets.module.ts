import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetComponent } from './views/widget/widget.component';
import { WidgetConfigComponent } from './configs/widget-config/widget-config.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppMaterialModule } from '../app-material-module/app-material.module';
import { NgReduxModule } from '@angular-redux/store';

@NgModule({
  declarations: [
    WidgetComponent,
    WidgetConfigComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    FlexLayoutModule,
    NgReduxModule
  ],
  exports: [
    WidgetComponent,
    WidgetConfigComponent
  ]
})
export class WidgetsModule { }
