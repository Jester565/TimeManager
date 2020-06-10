import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { AppState } from './redux/root';
import { Dashboard } from './redux/dashboards';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
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
  loading = true;
  title = 'timeManager';
  selectedDashboard: Dashboard = null;

  @select() dashboards: Observable<Dashboard[]>;
  constructor(public auth: AngularFireAuth, private ngRedux: NgRedux<AppState>) {
    auth.authState.subscribe((authState) => {
      this.loading = false;
    })
  }

  ngOnInit() {
    this.dashboards.subscribe((dashboards) => { 
      this.selectedDashboard = _.find(dashboards, { selected: true });
    })
  }

  login() {
    this.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logOut() {
    this.auth.signOut();
  }
}
