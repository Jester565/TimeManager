import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

export interface ConfirmCancelData {
    title: string,
    content: string
}

@Component({
    selector: 'app-confirm-cancel-dialog',
    templateUrl: 'confirm-cancel-dialog.html'
})
export class ConfirmCancelDialog {
    constructor(
        public dialogRef: MatDialogRef<ConfirmCancelDialog>,
        @Inject(MAT_DIALOG_DATA) public data: ConfirmCancelData
    ) { }
}