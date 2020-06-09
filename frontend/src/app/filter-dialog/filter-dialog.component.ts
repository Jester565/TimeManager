import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Filter } from '../redux/dashboards';
import _ from 'lodash';

@Component({
  selector: 'app-filter-dialog',
  templateUrl: 'filter-dialog.component.html'
})
export class FilterDialog {
  filter: Filter = null;

  constructor(
    public dialogRef: MatDialogRef<FilterDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Filter
  ) { 
    this.filter = _.cloneDeep(data);
  }
}