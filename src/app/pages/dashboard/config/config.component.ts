import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css'],
})
export class ConfigComponent implements OnInit {
  update: boolean = false;
  flagPass: boolean = false;
  formProfile: FormGroup;
  formPassword: FormGroup;

  userData:User=null;

  userInfo = {
    id: 36,
    nombres: 'Pepito Andres',
    apellidos: 'Perez Torres',
    documento: '1001002003',
    fechaNacimiento: '2021-01-01',
    telefono: 3210000,
    mail: 'user@correo.com',
    pais: 'Colombia',
    ciudad: 'Bogota',
    userName: 'iorch1234',
    password: 'pass',
    validPass: 'pass',
    capitalInicial: 100,
    direccion: 'calle a # 1-2 sur',
    codigoPostal: '1235',
    referido: '@referido',
  };

  constructor(
    private router: Router,
    private apiService: ApiService,
    private userService: UserService
  ) {
    this.apiService.getUser().then(
      (res)=>{
        if(res!=null && res!=undefined){
          this.userData=res;
          console.log(this.userData);
        }
      }
    ).catch((error)=>{
      console.error(error);
    });
  }

  ngOnInit(): void {
    /** Cuando funcione traer la info del back que esta en UserData
     *  se debe reemplazar "UserInfo" por "UserData"
     */
    this.formProfile = new FormGroup({
      nombres: new FormControl(this.userInfo.nombres),
      apellidos: new FormControl(this.userInfo.apellidos),
      documento: new FormControl(this.userInfo.documento),
      fechaNacimiento: new FormControl(this.userInfo.fechaNacimiento),
      telefono: new FormControl(this.userInfo.telefono),
      mail: new FormControl(this.userInfo.mail),
      pais: new FormControl(this.userInfo.pais),
      ciudad: new FormControl(this.userInfo.ciudad),
      userName: new FormControl(this.userInfo.userName),
      direccion: new FormControl(this.userInfo.direccion),
      codigoPostal: new FormControl(this.userInfo.codigoPostal),
      referido: new FormControl(this.userInfo.referido),
    });

    this.formPassword = new FormGroup({
      passActual: new FormControl(''),
      newPass: new FormControl(''),
      validNewPass: new FormControl(''),
    });
  }

  changeFields() {
    this.update = !this.update;
  }

  changePassword() {
    this.flagPass = !this.flagPass;
    if (this.update) {
      this.update = !this.update;
    } else {
      this.changeFields();
    }
  }

  updateInfo() {
    Swal.fire({
      title: 'Actualizacion de Datos',
      text: '¿Esta segur@ de actualizar esta información?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
    }).then((result) => {
      if (result.isConfirmed) {
        if (!this.formPassword.valid) {
          Swal.fire({
            icon: 'error',
            title: 'Error. Registro',
            text: 'Debe diligenciar los campos correctamente.',
            showConfirmButton: false,
            timer: 2000,
          });
        } else {
          const editRegistro = this.formProfile.value;
          this.userService.put('/api/registro', editRegistro, this.userInfo.id)
            .subscribe((res: any) => {
              console.log(res);
              Swal.fire(
                'Datos Actualizados!',
                'Los nuevos datos han sido ingresados',
                'success'
              );
            });
          this.update = false;
        }
      }
    });
  }

  updatePass() {
    let passData=this.formPassword.value;
    /*Lo que llega:

      passActual ,
      newPass,
      validNewPass, 
    */
   console.log(passData);
   
    if (!this.formPassword.valid) {
      Swal.fire({
        icon: 'error',
        title: 'Error. Nueva Contraseña',
        text: 'Debe diligenciar los campos correctamente.',
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      ///api/changePass', passData, this.userData.id (El id del usuario cargado)
      this.userService.put('/api/changePass', passData, this.userInfo.id)
      .subscribe((res: any) => {
        console.log(res);
        Swal.fire(
          'Contraseña Actualizada!',
          'Su contraseña se reestablecio correctamente.',
          'success'
        );
      });
      
      this.flagPass = false;
    }
  }
}
