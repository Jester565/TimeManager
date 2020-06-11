import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RangeWrapperComponent } from './range-wrapper.component';

describe('RangeWrapperComponent', () => {
  let component: RangeWrapperComponent;
  let fixture: ComponentFixture<RangeWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RangeWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RangeWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
