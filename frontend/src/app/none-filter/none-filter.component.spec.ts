import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoneFilterComponent } from './none-filter.component';

describe('NoneFilterComponent', () => {
  let component: NoneFilterComponent;
  let fixture: ComponentFixture<NoneFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoneFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoneFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
