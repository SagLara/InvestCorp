import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  formRegistro: FormGroup;
  fecha = '1/01/2021';

  constructor(
    private router: Router,
    private apiService: ApiService,
    private userService: UserService
  ) {}

  /*
  Revisar Validators y validaciones importantes 
  */

  ngOnInit(): void {
    this.formRegistro = new FormGroup({
      nombres: new FormControl(''),
      apellidos: new FormControl(''),
      documento: new FormControl(''),
      fechaNacimiento: new FormControl(),
      telefono: new FormControl(),
      mail: new FormControl(''),
      pais: new FormControl(''),
      ciudad: new FormControl(''),
      userName: new FormControl(''),
      password: new FormControl(''),
      validPass: new FormControl(''),
      capitalInicial: new FormControl(),
      direccion: new FormControl(''),
      codigoPostal: new FormControl(''),
      referido: new FormControl(''),
    });
  }

  registro() {
    const registro = this.formRegistro.value;

    let dato = JSON.stringify(this.formRegistro.value);
    console.log(dato);

    console.log(registro.password);
    console.log(registro.validPass);
    if (!this.formRegistro.valid) {
      Swal.fire({
        icon: 'error',
        title: 'Error. Registro',
        text: 'Debe diligenciar los campos correctamente.',
        showConfirmButton: false,
        timer: 2000,
      });
    } else if (registro.password != registro.validPass) {
      Swal.fire({
        icon: 'error',
        title: 'Error.',
        text: 'Las contraseñas deben ser iguales',
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    } else {
      this.userService.post('/api/registro', registro).subscribe((res: any) => {
        console.log(res);
        //res=true;
        if (res == null) {
          // En caso de que haya ocurrido un error en la petición.
          Swal.fire({
            icon: 'error',
            title: 'Error. Registro',
            text: 'Ocurrio un error al crear el usuario ',
            showConfirmButton: false,
            timer: 1500,
          });
        } else if (!res) {
          // Recibe res=false esta respuesta es en caso que el usuario ya exista en la base de datos.
          Swal.fire({
            icon: 'error',
            title: 'Error. Usuario Duplicado',
            text: 'El usuario ya existe ',
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          // En caso de que el flujo se haya creado correctamente.
          Swal.fire({
            icon: 'success',
            title: 'Usuario creado',
            text: res,
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            this.router.navigate(['login']);
          });
        }
      });
    }
  }
}
