import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterDialog } from './filter-dialog.component';

describe('FilterDialogComponent', () => {
  let component: FilterDialog;
  let fixture: ComponentFixture<FilterDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
