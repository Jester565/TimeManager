import { Component, OnInit, Input } from '@angular/core';
import { Dashboard, setConfigWidgetID } from '../../redux/dashboards';
import { NgRedux } from '@angular-redux/store';
import { AppState } from 'src/app/redux/root';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @Input() dashboard: Dashboard;

  constructor(private ngRedux: NgRedux<AppState>) { }

  ngOnInit(): void {
  }

  onConfigDone() {
    this.ngRedux.dispatch(setConfigWidgetID(this.dashboard.id, null));
  }
}
