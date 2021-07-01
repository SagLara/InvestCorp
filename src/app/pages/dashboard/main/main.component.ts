import { Component, Directive, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { GananciaTotal } from 'src/app/models/ganancia-total.model';
import { GananciaDiaria } from '../../../models/ganancia-diaria.model';
import { HistoricoGanancias } from '../../../models/historico-ganancias.model';
import { User } from '../../../models/user.model';

const GANANCIAS: HistoricoGanancias[] = [
  {
    id: 1,
    fecha: new Date("28-06-2021"),
    gananciaDiariaId: {
      id: 3,
      ingresos: 958800,
      perdidas: 1206002,
      numeroTransacciones: 107,
    },
    valorTotal: -247.202,
    userId: 36,
  },
  {
    id: 2,
    fecha: new Date("26-06-2021"),
    gananciaDiariaId: {
      id: 2,
      ingresos: 855002,
      perdidas: 256002,
      numeroTransacciones: 52,
    },
    valorTotal: 599000,
    userId: 36,
  },
  {
    id: 3,
    fecha: new Date("20-06-2021"),
    gananciaDiariaId: {
      id: 1,
      ingresos: 550000,
      perdidas: 355050,
      numeroTransacciones: 107,
    },
    valorTotal: 194950,
    userId: 36,
  }
  
  
];

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  gananciaHoy: GananciaDiaria;
  gananciaTotal: GananciaTotal;
  userGanancias: User;
  ganancias:HistoricoGanancias[]=[];

  itemsPag: number[] = [2, 4, 5, 10, 15, 25, 50, 75, 100];
  page = 1;
  pageSize = 4;
  collectionSize = GANANCIAS.length;

  constructor() {}


  ngOnInit(): void {
    this.gananciaHoy=new GananciaDiaria();
    this.userGanancias =new User();
    this.gananciaTotal= new GananciaTotal();
    for (let i = 1; i < 10; i++) {
      let historico: HistoricoGanancias=new HistoricoGanancias();
      let ganancia:GananciaDiaria=new GananciaDiaria();
      let fecha = "2021-06-"+(30-i);

      ganancia.id=this.gananciaHoy.id+i;
      ganancia.ingresos=this.gananciaHoy.ingresos*i;
      ganancia.perdidas=this.gananciaHoy.perdidas*i;
      ganancia.numeroTransacciones=this.gananciaHoy.numeroTransacciones+i;

      historico.gananciaDiariaId=ganancia;
      historico.userId=this.userGanancias.id;
      historico.fecha= new Date(fecha);
      historico.valorTotal=ganancia.ingresos-ganancia.perdidas;

      console.log(historico.gananciaDiariaId);

      this.gananciaTotal.valorNeto+=historico.valorTotal;
      this.gananciaTotal.numeroTransacciones+=ganancia.numeroTransacciones;
      this.ganancias.push(historico);
    }    
    this.gananciaTotal.diasActivo=this.ganancias.length;
    this.gananciaTotal.usuario=this.userGanancias;
    
  }

}
