import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiService } from '../../services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  menuExpand: boolean = environment.DROP_MENU;

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit(): void {
    this.menuExpand = environment.DROP_MENU;
  }
}
