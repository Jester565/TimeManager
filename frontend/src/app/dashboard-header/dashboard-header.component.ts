import { Component, OnInit, Input } from '@angular/core';
import { Dashboard, addWidget, Widget, setEditting } from '../redux/dashboards';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../redux/root';
import _ from 'lodash';
import { findWidgetsBottom } from '../common/dashUtils';
import { v4 as uuidv4 } from 'uuid';

const DEFAULT_WIDGET_W = 5;
const DEFAULT_WIDGET_H = 5;

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.css']
})
export class DashboardHeaderComponent implements OnInit {
  showingFilter: boolean = false;
  @Input() dashboard: Dashboard;

  constructor(private ngRedux: NgRedux<AppState>) { }

  ngOnInit(): void {
  }
  
  onFilter() {

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
    console.log("----------");
    this.ngRedux.dispatch(addWidget(this.dashboard.id, widget, widgetID));
  }

  onEdit() {
    this.ngRedux.dispatch(setEditting(this.dashboard.id, !this.dashboard.editting));
  }
}
