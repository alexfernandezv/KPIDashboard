import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintVelocityComponent } from './sprint-velocity.component';

describe('SprintVelocityComponent', () => {
  let component: SprintVelocityComponent;
  let fixture: ComponentFixture<SprintVelocityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SprintVelocityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintVelocityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
