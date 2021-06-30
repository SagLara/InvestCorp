import { User } from "./user.model";

export class GananciaTotal {

    id: number;
    valorNeto: number;
    numeroTransacciones: number;
    diasActivo: number;
    usuario: User;

    constructor(){
        this.id= 1;
        this.valorNeto= 0;
        this.numeroTransacciones= 0;
        this.diasActivo= 0;
        this.usuario=null;
    }
}