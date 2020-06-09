import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmCancelDialog } from './confirm-cancel-dialog';
import { AppMaterialModule } from '../app-material-module/app-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [
    ConfirmCancelDialog
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    FlexLayoutModule
  ],
  exports: [
    ConfirmCancelDialog
  ]
})
export class AppCommonModule { };
export { ConfirmCancelDialog as ConfirmCancelDialog } from './confirm-cancel-dialog';