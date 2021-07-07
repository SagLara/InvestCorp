import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ConfigComponent } from './config/config.component';
import { MainComponent } from './main/main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreComponent } from './store/store.component';
import { NgxPaginationModule} from 'ngx-pagination';
import { NetworkComponent } from './network/network.component';
import { NgxGraphModule } from '@swimlane/ngx-graph';
@NgModule({
  declarations: [ConfigComponent, MainComponent, StoreComponent, NetworkComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxGraphModule
  ],
  exports: [MainComponent],
  bootstrap: [MainComponent],
})
export class DashboardModule {}
