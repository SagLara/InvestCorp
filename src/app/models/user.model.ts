export class User{
    
    id: number;
    nombres: string;
    apellidos: string;
    documento: string;
    fechaNacimiento: string;
    telefono: number;
    mail: string;
    pais: string;
    ciudad: string;
    userName: string;
    password: string;
    validPass: string;
    capitalInicial: number;
    direccion: string;
    codigoPostal: string;
    referido: string;
    
    constructor(){
        this.id= 0;
        this.nombres= 'Juan Andres';
        this.apellidos= 'Lopez Torres';
        this.documento= '1020002003';
        this.fechaNacimiento= '2002-01-01';
        this.telefono= 3210000;
        this.mail= 'juan.lopez@investcorp.com';
        this.pais= 'Mexico';
        this.ciudad= 'Acapulco';
        this.userName= 'juanloto2002';
        this.password= 'loto0101';
        this.validPass= 'loto0101';
        this.capitalInicial= 100;
        this.direccion= 'calle 34 # 15-27 ';
        this.codigoPostal= '210035';
        this.referido= '@tomorrow';
    }
}