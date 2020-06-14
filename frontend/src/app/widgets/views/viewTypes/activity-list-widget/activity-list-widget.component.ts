import { Component, OnInit, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { staticImplements } from 'src/app/common/static';
import { StaticWidgetInterface, WidgetInterface } from '../widget.interface';
import { ActivityPeriodService } from 'src/app/activity-period.service';
import { ActivityPeriod } from 'src/app/schedules/schedule';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivityPeriodComponent } from 'src/app/schedules/rangeTypes/activity-period/activity-period.component';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Widget, Filter } from 'src/app/redux/dashboards';
import { FilterComponent } from 'src/app/filters/filter/filter.component';
import _ from 'lodash';

@Component({
  selector: 'app-activity-list-widget',
  templateUrl: './activity-list-widget.component.html',
  styleUrls: ['./activity-list-widget.component.css']
})
@staticImplements<StaticWidgetInterface>()
export class ActivityListWidgetComponent implements OnInit, WidgetInterface, OnDestroy {
  static Name = "Activity List";
  static TypeID = "activity-list";
  
  public listType = ActivityPeriodComponent;
  @Input() dashboardID;
  @Input() widgetID;
  private _filter: Filter;
  get filter() {
    return this._filter;
  }
  @Input('filter')
  set filter(val) {
    if (this._filter == null || !_.isEqual(this._filter, val)) {
      this._filter = val;
      this.subscribeToActivityPeriods();
    }
  }
  @Input() widget;
  @Output() widgetChange = new EventEmitter<Widget>();
  activityPeriods: BehaviorSubject<any[]> = null;
  activities: string[] = [];
  constructor(private activityPeriodService: ActivityPeriodService, 
    public auth: AngularFireAuth, private afs: AngularFirestore) {
    
  }
  ngOnDestroy(): void {

  }

  ngOnInit(): void {
    this.auth.user.subscribe((user) => {
      if (user && user.uid) {
        this.afs.doc(`/users/${user.uid}`).valueChanges().subscribe((user: any) => {
          this.activities = user.activities;
        })
      }
    });
    if (this.filter != null) {
      this.subscribeToActivityPeriods();
    }
  }

  subscribeToActivityPeriods() {
    let range = FilterComponent.ExecuteFilter(this.filter);
    this.activityPeriods = this.activityPeriodService.subscribe(range.start, range.end);
  }

  onAdd(activityPeriod) {
    this.activityPeriodService.setActivityPeriod(activityPeriod);
  }

  onUpdate(activityPeriod) {
    this.activityPeriodService.setActivityPeriod(activityPeriod);
  }
  
  onDelete(activityPeriod) {
    this.activityPeriodService.deleteActivityPeriod(activityPeriod.id);
  }
}
