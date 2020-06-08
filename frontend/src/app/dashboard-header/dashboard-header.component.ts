import { Component, OnInit, Input } from '@angular/core';
import { Dashboard } from '../redux/dashboards';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../redux/root';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.css']
})
export class DashboardHeaderComponent implements OnInit {
  @Input() dashboard: Dashboard;

  constructor(private ngRedux: NgRedux<AppState>) { }

  ngOnInit(): void {
  }

  onEdit() {
    //TODO
  }
}
