import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AboutComponent } from './components/public/about/about.component';
import { DashboardCatalogueComponent } from './components/public/dashboard-catalogue/dashboard-catalogue.component';
import { InitialComponent } from './components/public/initial/initial.component';
import { LoginComponent } from './components/public/login/login.component';
import { BugManagementComponent } from './components/secured/dashboards/bug-management/bug-management.component';
import { DashboardsComponent } from './components/secured/dashboards/dashboards.component';
import { EfectivenessManagementComponent } from './components/secured/dashboards/efectiveness-management/efectiveness-management.component';
import { SprintManagementComponent } from './components/secured/dashboards/sprint-management/sprint-management.component';
import { TeamManagementComponent } from './components/secured/dashboards/team-management/team-management.component';
import { HowtoComponent } from './components/secured/howto/howto.component';
import { ProjectComponent } from './components/secured/project/project.component';

const routes: Routes = [
  {path:'', component: InitialComponent},
  {path:'dashboard-catalogue', component: DashboardCatalogueComponent},
  {path:'about', component: AboutComponent},
  {path:'login', component: LoginComponent},
  {path:'project', component: ProjectComponent, canActivate: [AuthGuard]},
  {path:'dashboards', component: DashboardsComponent, canActivate: [AuthGuard]},
  {path:'dashboards/team-management', component: TeamManagementComponent, canActivate: [AuthGuard]},
  {path:'dashboards/sprint-management', component: SprintManagementComponent, canActivate: [AuthGuard]},
  {path:'dashboards/efectiveness-management', component: EfectivenessManagementComponent, canActivate: [AuthGuard]},
  {path:'dashboards/bug-management', component: BugManagementComponent, canActivate: [AuthGuard]},
  {path:'how-to', component: HowtoComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
