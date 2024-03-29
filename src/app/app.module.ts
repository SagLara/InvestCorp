import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { JwtHelperService, JWT_OPTIONS } from "@auth0/angular-jwt";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NavbarComponent } from './pages/dashboard/components/navbar/navbar.component';
import { SidebarComponent } from './pages/dashboard/components/sidebar/sidebar.component';
import { DashboardModule } from './pages/dashboard/dashboard.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    DashboardComponent,
    NavbarComponent,
    SidebarComponent
  ],
  imports: [
    DashboardModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    {provide: JWT_OPTIONS, useValue:JWT_OPTIONS},
    JwtHelperService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
