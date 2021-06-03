import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  formRegistro: FormGroup;
  fecha= '1/01/2021';

  constructor(private router: Router, private apiService: ApiService , private userService: UserService) { }

  /*
  Revisar Validators y validaciones importantes 
  */

  ngOnInit(): void {
    this.formRegistro = new FormGroup({
      nombres: new FormControl('Pepito Andres'),
      apellidos: new FormControl('Perez Torres'),
      documento: new FormControl('1001002003'),
      fechaNacimiento: new FormControl('2021-01-01'),
      telefono: new FormControl(3210000),
      mail: new FormControl('user@correo.com'),
      pais: new FormControl('Colombia'),
      ciudad: new FormControl('Bogota'),
      userName: new FormControl('iorch1234'),
      password: new FormControl('pass'),
      validPass: new FormControl('pass'),
      capitalInicial: new FormControl(100),
      direccion: new FormControl('calle a # 1-2 sur'),
      codigoPostal: new FormControl('1235'),
      referido: new FormControl('url'),
    });
  }

}
