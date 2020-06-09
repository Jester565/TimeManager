import { Component, OnInit, Input } from '@angular/core';
import { Dashboard, addWidget, Widget, setEditting, debounceDashboardName, setDashboardFilter } from '../redux/dashboards';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../redux/root';
import _ from 'lodash';
import { findWidgetsBottom } from '../common/dashUtils';
import { v4 as uuidv4 } from 'uuid';
import { MatDialog } from '@angular/material/dialog';
import { FilterDialog } from '../filter-dialog/filter-dialog.component';

const DEFAULT_WIDGET_W = 5;
const DEFAULT_WIDGET_H = 5;

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.css']
})
export class DashboardHeaderComponent implements OnInit {
  @Input() dashboard: Dashboard;

  constructor(private ngRedux: NgRedux<AppState>,
    public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  
  onFilter() {
    const dialogRef = this.dialog.open
    (FilterDialog, {
      width: '800px',
      data: this.dashboard.filter
    });
    
    dialogRef.afterClosed().subscribe(filter => {
      if (filter != null) {
        this.ngRedux.dispatch(setDashboardFilter(this.dashboard.id, filter));
      }
    })
  }

  onAddWidget() {
    let widgetsBottom = findWidgetsBottom(Object.values(this.dashboard.widgets));
    let widget: Widget = {
      type: null,
      config: null,
      position: {
        top: widgetsBottom,
        left: 0,
        width: DEFAULT_WIDGET_W,
        height: DEFAULT_WIDGET_H
      }
    }
    let widgetID = uuidv4();
    this.ngRedux.dispatch(addWidget(this.dashboard.id, widget, widgetID));
  }

  onEdit() {
    this.ngRedux.dispatch(setEditting(this.dashboard.id, !this.dashboard.editting));
  }
  onNameChange(evt) {
    this.ngRedux.dispatch(debounceDashboardName(this.dashboard.id, evt.target.value));
  }
}
