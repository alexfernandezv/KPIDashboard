import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannedVsUtilizedComponent } from './planned-vs-utilized.component';

describe('PlannedVsUtilizedComponent', () => {
  let component: PlannedVsUtilizedComponent;
  let fixture: ComponentFixture<PlannedVsUtilizedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlannedVsUtilizedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlannedVsUtilizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
