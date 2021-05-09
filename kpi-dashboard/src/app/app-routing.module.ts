import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AboutComponent } from './public/about/about.component';
import { DashboardCatalogueComponent } from './public/dashboard-catalogue/dashboard-catalogue.component';
import { InitialComponent } from './public/initial/initial.component';
import { LoginComponent } from './public/login/login.component';
import { DashboardsComponent } from './secured/dashboards/dashboards.component';
import { HowtoComponent } from './secured/howto/howto.component';
import { ProjectComponent } from './secured/project/project.component';

const routes: Routes = [
  {path:'', component: InitialComponent},
  {path:'dashboard-catalogue', component: DashboardCatalogueComponent},
  {path:'about', component: AboutComponent},
  {path:'login', component: LoginComponent},
  {path:'project', component: ProjectComponent, canActivate: [AuthGuard]},
  {path:'dashboards', component: DashboardsComponent, canActivate: [AuthGuard]},
  {path:'how-to', component: HowtoComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
