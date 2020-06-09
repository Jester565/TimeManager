import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineChartWidgetConfigComponent } from './line-chart-widget-config.component';

describe('LineChartWidgetConfigComponent', () => {
  let component: LineChartWidgetConfigComponent;
  let fixture: ComponentFixture<LineChartWidgetConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineChartWidgetConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineChartWidgetConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
