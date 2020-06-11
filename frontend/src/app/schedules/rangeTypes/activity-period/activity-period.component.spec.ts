import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityPeriodComponent } from './activity-period.component';

describe('ActivityPeriodComponent', () => {
  let component: ActivityPeriodComponent;
  let fixture: ComponentFixture<ActivityPeriodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityPeriodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
