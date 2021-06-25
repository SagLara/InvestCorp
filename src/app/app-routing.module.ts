import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {
    path : 'login', 
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path : 'registro', 
    component: RegistroComponent,
    canActivate: [LoginGuard]
  },
  {
    path : 'home', 
    component: HomeComponent,
    canActivate: [LoginGuard]
  },
  {
    path : 'dashboard', 
    component: DashboardComponent,
    //canActivate: [AuthGuard]
  },
  {path : '', pathMatch:'full', redirectTo: 'home'},
  {path : '**', pathMatch:'full', redirectTo: 'home'}

];

const config: ExtraOptions = {
  useHash: true,
};
@NgModule({
  imports: [RouterModule.forRoot(routes,config)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
