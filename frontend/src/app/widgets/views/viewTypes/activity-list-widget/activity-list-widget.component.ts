import { Component, OnInit, Input } from '@angular/core';
import { staticImplements } from 'src/app/common/static';
import { StaticWidgetInterface, WidgetInterface } from '../widget.interface';
import { ActivityPeriodService } from 'src/app/activity-period.service';
import { ActivityPeriod } from 'src/app/schedules/schedule';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivityPeriodComponent } from 'src/app/schedules/rangeTypes/activity-period/activity-period.component';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-activity-list-widget',
  templateUrl: './activity-list-widget.component.html',
  styleUrls: ['./activity-list-widget.component.css']
})
@staticImplements<StaticWidgetInterface>()
export class ActivityListWidgetComponent implements OnInit, WidgetInterface {
  static Name = "Activity List";
  static TypeID = "activity-list";
  
  public listType = ActivityPeriodComponent;
  @Input() dashboardID;
  @Input() widgetID;
  @Input() filter;
  @Input() widget;
  activityPeriods: BehaviorSubject<any[]> = null;
  activities: string[] = [];
  constructor(private activityPeriodService: ActivityPeriodService, 
    public auth: AngularFireAuth, private afs: AngularFirestore) {
    
  }

  ngOnInit(): void {
    this.auth.user.subscribe((user) => {
      if (user && user.uid) {
        this.afs.doc(`/users/${user.uid}`).valueChanges().subscribe((user: any) => {
          this.activities = user.activities;
        })
      }
    });
    this.activityPeriods = this.activityPeriodService.subscribe(null, null);
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
