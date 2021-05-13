import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiTeamManagementCardComponent } from './kpi-team-management-card.component';

describe('KpiTeamManagementCardComponent', () => {
  let component: KpiTeamManagementCardComponent;
  let fixture: ComponentFixture<KpiTeamManagementCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KpiTeamManagementCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KpiTeamManagementCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
