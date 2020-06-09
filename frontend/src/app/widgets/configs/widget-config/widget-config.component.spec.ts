import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetConfigComponent } from './widget-config.component';

describe('WidgetConfigComponent', () => {
  let component: WidgetConfigComponent;
  let fixture: ComponentFixture<WidgetConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
