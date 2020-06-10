import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterDateCreatorComponent } from './filter-date-creator.component';

describe('FilterDateCreatorComponent', () => {
  let component: FilterDateCreatorComponent;
  let fixture: ComponentFixture<FilterDateCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterDateCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterDateCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
