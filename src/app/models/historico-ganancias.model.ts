import { GananciaDiaria } from "./ganancia-diaria.model";
import { User } from './user.model';

export class HistoricoGanancias {

    id: number;
    fecha: Date;
    gananciaDiariaId: GananciaDiaria;
    valorTotal: number;
    userId: number;

    constructor(){
        this.id= 0;
        this.fecha= new Date(Date.now());
        this.gananciaDiariaId= null;
        this.valorTotal= 376000;
        this.userId= null;
    }
}