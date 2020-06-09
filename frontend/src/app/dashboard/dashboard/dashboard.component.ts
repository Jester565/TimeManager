import { Component, OnInit, Input } from '@angular/core';
import { Dashboard } from '../../redux/dashboards';

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
