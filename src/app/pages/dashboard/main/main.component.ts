import { Component, OnInit } from '@angular/core';
import { GananciaTotal } from 'src/app/models/ganancia-total.model';
import { GananciaDiaria } from '../../../models/ganancia-diaria.model';
import { HistoricoGanancias } from '../../../models/historico-ganancias.model';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {


  gananciaHoy: GananciaDiaria;
  gananciaTotal: GananciaTotal;
  userGanancias: User;
  //historico: HistoricoGanancias;
  ganancias:HistoricoGanancias[]=[];

  constructor() { }

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
      historico.userId=this.userGanancias;
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
