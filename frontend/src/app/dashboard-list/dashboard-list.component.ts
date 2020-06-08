import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { select, NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { Dashboard, moveDashboard, selectDashboard, removeDashboard, addDashboard } from '../redux/dashboards';
import { AppState } from '../redux/root';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmCancelDialog } from '../common/confirm-cancel-dialog';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';

@Component({
  selector: 'app-dashboard-list',
  templateUrl: './dashboard-list.component.html',
  styleUrls: ['./dashboard-list.component.css']
})
export class DashboardListComponent implements OnInit {
  editting: boolean = false;
  @select() dashboards: Observable<Dashboard[]>;

  constructor(private ngRedux: NgRedux<AppState>,
    public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<Dashboard[]>) {
    this.ngRedux.dispatch(moveDashboard(event.previousIndex, event.currentIndex));
  }

  onEditToggle() {
    this.editting = !this.editting;
  }

  onDashboardSelect(id: string) {
    this.ngRedux.dispatch(selectDashboard(id));
  }

  onDashboardDelete(dashboard: Dashboard) {
    this.openDeleteDialog(dashboard);
  }

  openDeleteDialog(dashboard: Dashboard) {
    const dialogRef = this.dialog.open
    (ConfirmCancelDialog, {
      width: '600px',
      data: {
        title: `Delete dashboard: ${dashboard.name}?`,
        content: ''
      }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      this.ngRedux.dispatch(removeDashboard(dashboard.id));
    })
  }

  onAddDashboard() {
    let dashboard: Dashboard = {
      id: uuidv4(),
      name: "Untitled Dashboard",
      filter: null,
      selected: false,
      widgets: {}
    }
    this.ngRedux.dispatch(addDashboard(dashboard));
    this.ngRedux.dispatch(selectDashboard(dashboard.id));
  }
}
