import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterWidgetComponent } from './counter-widget.component';

describe('CounterWidgetComponent', () => {
  let component: CounterWidgetComponent;
  let fixture: ComponentFixture<CounterWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CounterWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
