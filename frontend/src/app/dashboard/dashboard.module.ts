import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardBodyComponent } from './dashboard-body/dashboard-body.component';
import { AppMaterialModule } from '../app-material-module/app-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GridsterModule } from 'angular-gridster2';
import { WidgetsModule } from '../widgets/widgets.module';
import { FiltersModule } from '../filters/filters.module';
import { NgReduxModule } from '@angular-redux/store';



@NgModule({
  declarations: [
    DashboardComponent,
    DashboardHeaderComponent,
    DashboardBodyComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    FlexLayoutModule,
    GridsterModule,
    NgReduxModule,
    CommonModule,
    WidgetsModule,
    FiltersModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
