import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoneWidgetComponent } from './none-widget.component';

describe('NoneWidgetComponent', () => {
  let component: NoneWidgetComponent;
  let fixture: ComponentFixture<NoneWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoneWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoneWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
