import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { AppState } from './redux/root';
import { Dashboard } from './redux/dashboards';
import { Observable } from 'rxjs';
import _ from 'lodash';

export const getSelectedDashboard = obs$ => obs$
  .filter(dashboard => dashboard.selected)
  .first()

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'timeManager';
  selectedDashboard: Dashboard = null;

  @select() dashboards: Observable<Dashboard[]>;
  constructor(private ngRedux: NgRedux<AppState>) {
    
  }

  ngOnInit() {
    this.dashboards.subscribe((dashboards) => { 
      this.selectedDashboard = _.find(dashboards, { selected: true });
    })
  }
}
