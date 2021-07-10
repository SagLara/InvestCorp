import {
  Component,
  Directive,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { GananciaTotal } from 'src/app/models/ganancia-total.model';
import { GananciasService } from 'src/app/services/ganancias.service';
import { GananciaDiaria } from '../../../models/ganancia-diaria.model';
import { HistoricoGanancias } from '../../../models/historico-ganancias.model';
import { User } from '../../../models/user.model';
import { element } from 'protractor';
import { ApiService } from 'src/app/services/api.service';

const GANANCIAS: HistoricoGanancias[] = [
  {
    id: 1,
    fecha: new Date('28-06-2021'),
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
    fecha: new Date('26-06-2021'),
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
    fecha: new Date('20-06-2021'),
    gananciaDiariaId: {
      id: 1,
      ingresos: 550000,
      perdidas: 355050,
      numeroTransacciones: 107,
    },
    valorTotal: 194950,
    userId: 36,
  },
];

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  gananciaHoy: GananciaDiaria;
  gananciaTotal: GananciaTotal;
  userGanancias: User;
  ganancias: HistoricoGanancias[] = [];

  historicoData: HistoricoGanancias[] = [];

  fechaActual= new Date(Date.now());

  itemsPag: number[] = [2, 4, 5, 10, 15, 25, 50, 75, 100];
  page = 1;
  pageSize = 4;
  collectionSize = GANANCIAS.length;

  constructor
  ( private gananciasService:GananciasService, 
    private apiService: ApiService,) 
  {
    //Carga la información del usuario
    this.apiService.getUser().then(
      (res)=>{
        if(res!=null && res!=undefined){
          this.userGanancias=res;
          console.log(this.userGanancias);
        }
      }
    ).catch((error)=>{
      console.error(error);
    });
  }

  ngOnInit(): void {
    /** Se supone que con el back, esto practicamente no iria :v */
    this.userGanancias = new User();
    this.gananciaTotal = new GananciaTotal();
    this.gananciaHoy = new GananciaDiaria();
    for (let i = 1; i < 10; i++) {
      let historico: HistoricoGanancias = new HistoricoGanancias();
      let ganancia: GananciaDiaria = new GananciaDiaria();
      let fecha = '2021-06-' + (30 - i);

      ganancia.id = 8 + i;
      ganancia.ingresos = 255000 * i;
      ganancia.perdidas = 130000 * i;
      ganancia.numeroTransacciones = 3 + i;

      historico.gananciaDiariaId = ganancia;
      historico.userId = this.userGanancias.id;
      historico.fecha = new Date(fecha);
      historico.valorTotal = ganancia.ingresos - ganancia.perdidas;

      console.log(historico.gananciaDiariaId);

      this.gananciaTotal.valorNeto += historico.valorTotal;
      this.gananciaTotal.numeroTransacciones += ganancia.numeroTransacciones;
      this.ganancias.push(historico);
    }
    this.gananciaTotal.diasActivo = this.ganancias.length;
    this.gananciaTotal.usuario = this.userGanancias;
  }

  getHistoricoGanancias(){
    //En este caso no se pasa el id del historico si no del usuario para hacer la busqueda desde ahí
    this.gananciasService.get("/api/historico"+this.userGanancias.id).subscribe(
      (res)=>{
        if(res!=undefined && res!=null){
          /** La idea es que retorne el array de productos en formato json*/
          this.historicoData=res;
          this.gananciaHoy = new GananciaDiaria();
          let gananciaTotalData: GananciaTotal;

          //Comparar Fechas, la idea es mostrar la ganancia del dia actual
          if(this.fechaActual==this.historicoData[0].fecha){
            this.gananciaHoy=this.historicoData[0].gananciaDiariaId;
          }  
    
          for (let i = 0; i < this.historicoData.length; i++) {
            let element = this.historicoData[i];

            gananciaTotalData.valorNeto += element.valorTotal;
            gananciaTotalData.numeroTransacciones += element.gananciaDiariaId.numeroTransacciones;

          }
          this.gananciaTotal.diasActivo = this.historicoData.length;
          this.gananciaTotal.usuario = this.userGanancias;
        }
      },(error)=>{
        console.log(error);
      });
  }
}
