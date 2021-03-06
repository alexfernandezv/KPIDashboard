import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InitialComponent } from './components/public/initial/initial.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavbarComponent } from './components/navigation/navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule} from '@angular/material/card'; 
import {MatGridListModule} from '@angular/material/grid-list';
import { DashboardCatalogueComponent } from './components/public/dashboard-catalogue/dashboard-catalogue.component';
import { AboutComponent } from './components/public/about/about.component'; 
import {MatTooltipModule} from '@angular/material/tooltip'; 
import {MatTabsModule} from '@angular/material/tabs';
import { LoginComponent } from './components/public/login/login.component'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input';
import { NtkmeButtonModule } from '@ctrl/ngx-github-buttons';
import { ProjectComponent } from './components/secured/project/project.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { fakeBackendProvider } from './helpers/fake-backend';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDatepickerModule } from '@angular/material/datepicker'; 
import { AuthGuard } from './guards/auth.guard';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { UsersService } from './services/users/index';
import { AuthenticationService } from './services/authentication'
import { MatNativeDateModule } from '@angular/material/core';
import { DashboardsComponent } from './components/secured/dashboards/dashboards.component';
import { MatMenuModule } from '@angular/material/menu';
import { HowtoComponent } from './components/secured/howto/howto.component';
import { LayoutModule } from '@angular/cdk/layout';
import { TeamManagementComponent } from './components/secured/dashboards/team-management/team-management.component';
import { SprintManagementComponent } from './components/secured/dashboards/sprint-management/sprint-management.component';
import { EfectivenessManagementComponent } from './components/secured/dashboards/efectiveness-management/efectiveness-management.component';
import { BugManagementComponent } from './components/secured/dashboards/bug-management/bug-management.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 
import { ChartsModule } from 'ng2-charts';
import { MiniCardComponent } from './components/secured/mini-card/mini-card.component';
import { CardComponent } from './components/secured/card/card.component';
import { RolesChartComponent } from './components/secured/dashboards/team-management/charts/roles-chart/roles-chart.component';
import { DoneVsPlannedComponent } from './components/secured/dashboards/team-management/charts/done-vs-planned/done-vs-planned.component';
import { PlannedVsUtilizedComponent } from './components/secured/dashboards/team-management/charts/planned-vs-utilized/planned-vs-utilized.component';
import { BugsPerRoleComponent } from './components/secured/dashboards/team-management/charts/bugs-per-role/bugs-per-role.component';
import {MatSelectModule} from '@angular/material/select';
import { FilterMiniCardComponent } from './components/secured/filter-mini-card/filter-mini-card.component';
import { SprintVelocityComponent } from './components/secured/dashboards/sprint-management/charts/sprint-velocity/sprint-velocity.component';
import { SprintBurndownComponent } from './components/secured/dashboards/sprint-management/charts/sprint-burndown/sprint-burndown.component';
import { SprintCompletedTasksPerDayComponent } from './components/secured/dashboards/sprint-management/charts/sprint-completed-tasks-per-day/sprint-completed-tasks-per-day.component';
import { BugsPerSprintComponent } from './components/secured/dashboards/bug-management/charts/bugs-per-sprint/bugs-per-sprint.component';
import { BugsPerRolePieComponent } from './components/secured/dashboards/bug-management/charts/bugs-per-role-pie/bugs-per-role-pie.component';
import {MatList, MatListModule} from '@angular/material/list'; 
@NgModule({
  declarations: [
    AppComponent,
    InitialComponent,
    NavbarComponent,
    DashboardCatalogueComponent,
    AboutComponent,
    LoginComponent,
    ProjectComponent,
    DashboardsComponent,
    HowtoComponent,
    TeamManagementComponent,
    SprintManagementComponent,
    EfectivenessManagementComponent,
    BugManagementComponent,
    MiniCardComponent,
    CardComponent,
    RolesChartComponent,
    DoneVsPlannedComponent,
    PlannedVsUtilizedComponent,
    BugsPerRoleComponent,
    FilterMiniCardComponent,
    SprintVelocityComponent,
    SprintBurndownComponent,
    SprintCompletedTasksPerDayComponent,
    BugsPerSprintComponent,
    BugsPerRolePieComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatTooltipModule,
    MatTabsModule, 
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule, 
    MatProgressSpinnerModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    NtkmeButtonModule,
    FontAwesomeModule,
    MatMenuModule,
    LayoutModule,
    ChartsModule,
    MatSelectModule,
  ],
  providers: [CookieService, MatSnackBar, AuthGuard,
    AuthenticationService,
    UsersService,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: JwtInterceptor,
        multi: true
    },
    
    // providers used to create fake backend
    fakeBackendProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
