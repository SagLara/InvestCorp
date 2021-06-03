import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router : Router, private apiService: ApiService) { }

  ngOnInit(): void {
  }

  logOut(){
    if(this.apiService.isAuth()){
      Swal.fire({
        title: '¿Desea cerrar sesión?',
        text: "¿Esta segur@ de terminar la sesión de la aplicación?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Log Out!',
            'Su sesión ha finalizado.',
            'success'
          );
          localStorage.removeItem('token');
          this.router.navigate(['#']);
        }
      });
    }else{
      this.router.navigate(['#']);
    }
  }

}
