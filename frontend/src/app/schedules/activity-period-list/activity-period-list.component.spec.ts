import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityPeriodListComponent } from './activity-period-list.component';

describe('ActivityPeriodListComponent', () => {
  let component: ActivityPeriodListComponent;
  let fixture: ComponentFixture<ActivityPeriodListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityPeriodListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityPeriodListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
