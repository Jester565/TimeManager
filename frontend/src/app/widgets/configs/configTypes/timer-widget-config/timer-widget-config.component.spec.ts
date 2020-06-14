import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerWidgetConfigComponent } from './timer-widget-config.component';

describe('TimerWidgetConfigComponent', () => {
  let component: TimerWidgetConfigComponent;
  let fixture: ComponentFixture<TimerWidgetConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimerWidgetConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimerWidgetConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
