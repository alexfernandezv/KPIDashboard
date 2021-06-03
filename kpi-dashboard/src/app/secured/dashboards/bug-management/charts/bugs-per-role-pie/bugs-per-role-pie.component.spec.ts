import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugsPerRolePieComponent } from './bugs-per-role-pie.component';

describe('BugsPerRolePieComponent', () => {
  let component: BugsPerRolePieComponent;
  let fixture: ComponentFixture<BugsPerRolePieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BugsPerRolePieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BugsPerRolePieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
