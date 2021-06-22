import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCatalogueComponent } from './dashboard-catalogue.component';

describe('DashboardCatalogueComponent', () => {
  let component: DashboardCatalogueComponent;
  let fixture: ComponentFixture<DashboardCatalogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardCatalogueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardCatalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
