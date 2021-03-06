import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { select, NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { Dashboard, moveDashboard, selectDashboard, removeDashboard, addDashboard } from '../redux/dashboards';
import { AppState } from '../redux/root';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmCancelDialog } from '../app-common/app-common.module';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import { NoneFilterComponent } from '../filters/filterTypes/none-filter/none-filter.component';
import { first } from 'rxjs/operators'

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
    this.dashboards.pipe(first()).subscribe((dashboards) => {
      if (dashboards == null) {
        return;
      }
      let dashboardSelected = false;
      for (let dashboard of dashboards) {
        if (dashboard.selected) {
          dashboardSelected = true;
          break;
        }
      }
      if (!dashboardSelected && dashboards.length > 0) {
        this.ngRedux.dispatch(selectDashboard(dashboards[0].id));
      }
    })
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
    
    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.ngRedux.dispatch(removeDashboard(dashboard.id));
      }
    })
  }

  onAddDashboard() {
    let dashboard: Dashboard = {
      id: uuidv4(),
      name: "Untitled Dashboard",
      filter: {
        type: NoneFilterComponent.TypeID,
        config: {}
      },
      selected: false,
      widgets: {}
    }
    this.ngRedux.dispatch(addDashboard(dashboard));
    this.ngRedux.dispatch(selectDashboard(dashboard.id));
  }
}
