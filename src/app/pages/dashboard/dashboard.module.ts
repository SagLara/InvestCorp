import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ConfigComponent } from './config/config.component';
import { MainComponent } from './main/main.component';


@NgModule({
  declarations: [ConfigComponent, MainComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
  ]
})
export class DashboardModule { }
