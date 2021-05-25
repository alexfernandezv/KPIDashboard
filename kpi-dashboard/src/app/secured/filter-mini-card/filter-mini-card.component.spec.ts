import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterMiniCardComponent } from './filter-mini-card.component';

describe('FilterMiniCardComponent', () => {
  let component: FilterMiniCardComponent;
  let fixture: ComponentFixture<FilterMiniCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterMiniCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterMiniCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
