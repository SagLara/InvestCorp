import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ConfigComponent } from './config/config.component';
import { DashboardComponent } from './dashboard.component';
import { MainComponent } from './main/main.component';


const routes: Routes = [
  
  {
    path : 'dashboard', 
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'main', 
        component: MainComponent,
      },
      {
        path: 'config', 
        component: ConfigComponent,
      },
    ],
    
  },
  

];

const config: ExtraOptions = {
  useHash: true,
};
@NgModule({
  imports: [RouterModule.forRoot(routes,config)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
