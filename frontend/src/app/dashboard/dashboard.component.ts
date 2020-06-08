import { Component, OnInit, Input } from '@angular/core';
import { Dashboard } from '../redux/dashboards';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../redux/root';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @Input() dashboard: Dashboard;

  constructor() { }

  ngOnInit(): void {
  }
}
