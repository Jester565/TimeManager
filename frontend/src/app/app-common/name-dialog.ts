import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

export interface NameData {
    title: string,
    label: string
}

@Component({
    selector: 'app-name-dialog',
    templateUrl: 'name-dialog.html'
})
export class NameDialog {
    public name: string = ""

    constructor(
        public dialogRef: MatDialogRef<NameDialog>,
        @Inject(MAT_DIALOG_DATA) public data: NameData
    ) { }
}