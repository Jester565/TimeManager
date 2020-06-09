import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterWidgetConfigComponent } from './counter-widget-config.component';

describe('CounterWidgetConfigComponent', () => {
  let component: CounterWidgetConfigComponent;
  let fixture: ComponentFixture<CounterWidgetConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CounterWidgetConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterWidgetConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
