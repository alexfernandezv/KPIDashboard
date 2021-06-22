import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoneVsPlannedComponent } from './done-vs-planned.component';

describe('DoneVsPlannedComponent', () => {
  let component: DoneVsPlannedComponent;
  let fixture: ComponentFixture<DoneVsPlannedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoneVsPlannedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoneVsPlannedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
