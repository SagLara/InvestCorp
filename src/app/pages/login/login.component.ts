import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;

  constructor(private router: Router, private apiService: ApiService , private userService: UserService) { }

  /*
   Revisar "Remember me" y "Captcha"
  */

  ngOnInit(): void {
    this.formLogin = new FormGroup({
      usuario: new FormControl(''),
      password: new FormControl(''),
    });
  }

  login(){
    const user = this.formLogin.value;
    if(user.usuario=="" || user.password==""){
      Swal.fire({
        icon: 'error',
        title: 'Error. Datos Vacios',
        text: 'Por favor debe diligenciar los campos antes de continuar.',
        showConfirmButton: false,
        timer: 2000
      });
    }else{
      console.log(user);
      
      this.userService.post("/",user).subscribe((res:any) =>{
        console.log(res);
        if(res.token==undefined){
          Swal.fire({
            icon: 'error',
            title: 'Error.',
            text: res,
            showConfirmButton: false,
            timer: 1500
          });
        }else{
          localStorage.setItem('token', res.token);
          this.router.navigate(['main']);
        }  
      });
    }
  }

}
