import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityListWidgetConfigComponent } from './activity-list-widget-config.component';

describe('ActivityListWidgetConfigComponent', () => {
  let component: ActivityListWidgetConfigComponent;
  let fixture: ComponentFixture<ActivityListWidgetConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityListWidgetConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityListWidgetConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
