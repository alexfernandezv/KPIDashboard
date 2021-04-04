import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { DashboardCatalogueComponent } from './dashboard-catalogue/dashboard-catalogue.component';
import { InitialComponent } from './initial/initial.component';

const routes: Routes = [
  {path:'', component: InitialComponent},
  {path:'dashboard-catalogue', component: DashboardCatalogueComponent},
  {path:'about', component: AboutComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
