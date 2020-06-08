import { Component, OnInit, Input } from '@angular/core';
import { Dashboard, Widget, updateWidget } from '../redux/dashboards';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../redux/root';
import _ from 'lodash';
import { WidgetConfigComponent } from '../widget-config/widget-config.component';

interface WidgetPair {
  id: string,
  widget: Widget
}

@Component({
  selector: 'app-dashboard-body',
  templateUrl: './dashboard-body.component.html',
  styleUrls: ['./dashboard-body.component.css']
})
export class DashboardBodyComponent implements OnInit {
  widgets: WidgetPair[];
  private _dashboard: Dashboard = null;
  get dashboard(): Dashboard {
    return this._dashboard;
  }

  @Input('dashboard')
  set dashboard(val: Dashboard) {
    this._dashboard = val;
    this.widgets = _.map(val.widgets, (val, key) => {
      return {
        id: key,
        widget: val
      }
    });
  }

  constructor(private ngRedux: NgRedux<AppState>) { }

  ngOnInit(): void {
  }

  onWidgetPositionChange(evt: any) {
    let widgetPair = this.widgets[evt.index];
    if (!_.isEqual(widgetPair.widget.position, evt.newPosition)) {
      let widgetID = widgetPair.id;
      let widget = _.cloneDeep(widgetPair.widget);
      widget.position = evt.newPosition;
      this.ngRedux.dispatch(updateWidget(this.dashboard.id, widgetID, widget));
    }
  }
}
