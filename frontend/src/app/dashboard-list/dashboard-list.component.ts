import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { select, NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs';
import dashboards, { Dashboard, moveDashboard } from '../redux/dashboards';
import { AppState } from '../redux/root';

@Component({
  selector: 'app-dashboard-list',
  templateUrl: './dashboard-list.component.html',
  styleUrls: ['./dashboard-list.component.css']
})
export class DashboardListComponent implements OnInit {
  @select() dashboards: Observable<Dashboard[]>;

  constructor(private ngRedux: NgRedux<AppState>) { }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<Dashboard[]>) {
    this.ngRedux.dispatch(moveDashboard(event.previousIndex, event.currentIndex));
  }
}
