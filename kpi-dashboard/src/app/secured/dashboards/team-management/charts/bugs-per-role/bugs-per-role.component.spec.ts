import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugsPerRoleComponent } from './bugs-per-role.component';

describe('BugsPerRoleComponent', () => {
  let component: BugsPerRoleComponent;
  let fixture: ComponentFixture<BugsPerRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BugsPerRoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BugsPerRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
