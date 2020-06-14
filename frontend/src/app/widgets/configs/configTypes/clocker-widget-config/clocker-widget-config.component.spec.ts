import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClockerWidgetConfigComponent } from './clocker-widget-config.component';

describe('ClockerWidgetConfigComponent', () => {
  let component: ClockerWidgetConfigComponent;
  let fixture: ComponentFixture<ClockerWidgetConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClockerWidgetConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClockerWidgetConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
