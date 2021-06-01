import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintCompletedTasksPerDayComponent } from './sprint-completed-tasks-per-day.component';

describe('SprintCompletedTasksPerDayComponent', () => {
  let component: SprintCompletedTasksPerDayComponent;
  let fixture: ComponentFixture<SprintCompletedTasksPerDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SprintCompletedTasksPerDayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintCompletedTasksPerDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
