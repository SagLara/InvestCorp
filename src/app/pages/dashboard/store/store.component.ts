import { Component, OnInit } from '@angular/core';
import { Producto } from '../../../models/producto.model';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
})
export class StoreComponent implements OnInit {
  productos: Producto[] = [];

  constructor() {}

  ngOnInit(): void {
    let producto = new Producto();
    producto.id = 1;
    producto.nombre = 'Suscripción InvestCorp';
    producto.descripcion =
      'Suscripcion mensual para adquirir todos los beneficios de InvestCorp';
    producto.urlIcono = '/assets/images/icono-investcorp.png';
    producto.urlQr = '/assets/images/dummy_qr_bitcoin_delete.png';
    producto.valor = 30;
    producto.direccionBilletera = 'Tasd2aTW3qH43MghkI24OASD3CvXC22WVASD';
    this.productos.push(producto);
  }
}
