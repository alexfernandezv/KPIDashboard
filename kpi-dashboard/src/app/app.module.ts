import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InitialComponent } from './initial/initial.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavbarComponent } from './navigation/navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule} from '@angular/material/card'; 
import {MatGridListModule} from '@angular/material/grid-list';
import { DashboardCatalogueComponent } from './dashboard-catalogue/dashboard-catalogue.component';
import { AboutComponent } from './about/about.component'; 
import {MatTooltipModule} from '@angular/material/tooltip'; 
import {MatTabsModule} from '@angular/material/tabs';
import { LoginComponent } from './login/login.component'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input';
@NgModule({
  declarations: [
    AppComponent,
    InitialComponent,
    NavbarComponent,
    DashboardCatalogueComponent,
    AboutComponent,
    LoginComponent
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
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [CookieService, MatSnackBar],
  bootstrap: [AppComponent]
})
export class AppModule { }
