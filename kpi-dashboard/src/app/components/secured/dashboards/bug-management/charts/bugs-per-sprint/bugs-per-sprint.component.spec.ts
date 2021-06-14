import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugsPerSprintComponent } from './bugs-per-sprint.component';

describe('BugsPerSprintComponent', () => {
  let component: BugsPerSprintComponent;
  let fixture: ComponentFixture<BugsPerSprintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BugsPerSprintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BugsPerSprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
