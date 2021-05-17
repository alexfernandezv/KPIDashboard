import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesChartComponent } from './roles-chart.component';

describe('RolesChartComponent', () => {
  let component: RolesChartComponent;
  let fixture: ComponentFixture<RolesChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RolesChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
