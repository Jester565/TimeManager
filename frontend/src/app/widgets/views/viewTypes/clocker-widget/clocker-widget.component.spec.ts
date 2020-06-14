import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClockerWidgetComponent } from './clocker-widget.component';

describe('ClockerWidgetComponent', () => {
  let component: ClockerWidgetComponent;
  let fixture: ComponentFixture<ClockerWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClockerWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClockerWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
