import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2'; 
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private apiService : ApiService, 
    private router :Router
  ){
    
  }

  canActivate():boolean {
    if(!this.apiService.isAuth()){
      Swal.fire({
        icon: 'error',
        title: 'No esta Logeado',
        text: 'Token no es válido o ya expiró',
        showConfirmButton: false,
        timer: 1500
      }).then(()=>{
        this.router.navigate(['#']);
      }).catch(()=> {return false});
      return false;
    }
    return true;
  }
  
  
  
}
