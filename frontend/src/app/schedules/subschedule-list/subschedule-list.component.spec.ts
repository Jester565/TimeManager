import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscheduleListComponent } from './subschedule-list.component';

describe('SubscheduleListComponent', () => {
  let component: SubscheduleListComponent;
  let fixture: ComponentFixture<SubscheduleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscheduleListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscheduleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
