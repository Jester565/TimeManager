import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmCancelDialog } from './confirm-cancel-dialog';
import { AppMaterialModule } from '../app-material-module/app-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NameDialog } from './name-dialog';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ConfirmCancelDialog,
    NameDialog
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    FlexLayoutModule,
    FormsModule
  ],
  exports: [
    ConfirmCancelDialog,
    NameDialog
  ]
})
export class AppCommonModule { };
export { ConfirmCancelDialog as ConfirmCancelDialog } from './confirm-cancel-dialog';
export { NameDialog as NameDialog } from './name-dialog';