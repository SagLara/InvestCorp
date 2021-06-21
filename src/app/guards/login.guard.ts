import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private apiService : ApiService, 
    private router :Router
  ){
    
  }

  canActivate():boolean {
    if(this.apiService.isAuth()){
      Swal.fire({
        icon: 'error',
        title: 'Ya esta logeado',
        text: 'Debe cerrar sesión para ir a la ruta',
        showConfirmButton: false,
        timer: 1500
      }).then(()=>{
        this.router.navigate(['/dashboard/main']);
      }).catch(()=> {return false});
      return false;
    }
    return true;
  }
  
}
