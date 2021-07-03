import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ConfigComponent } from './config/config.component';
import { MainComponent } from './main/main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreComponent } from './store/store.component';
import { NgxPaginationModule} from 'ngx-pagination'
@NgModule({
  declarations: [ConfigComponent, MainComponent, StoreComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ],
  exports:[MainComponent],
  bootstrap:[MainComponent]
})
export class DashboardModule { }
