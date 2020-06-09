import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoneWidgetConfigComponent } from './none-widget-config.component';

describe('NoneWidgetConfigComponent', () => {
  let component: NoneWidgetConfigComponent;
  let fixture: ComponentFixture<NoneWidgetConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoneWidgetConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoneWidgetConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
