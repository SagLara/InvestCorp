import { Component, OnInit } from '@angular/core';
import { Producto } from '../../../models/producto.model';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
})
export class StoreComponent implements OnInit {
  productos: Producto[] = [];

  productosInfo: Producto[] = [];

  constructor(private productService:ProductService) {}

  ngOnInit(): void {
    let producto2 = new Producto();
    producto2.id = 1;
    producto2.nombre = 'Suscripción InvestCorp';
    producto2.descripcion =
      'Suscripcion mensual para adquirir todos los beneficios de InvestCorp';
    producto2.urlIcono =
      '/assets/images/icono_producto_educacion_investcorp.png';
    producto2.urlQr = '/assets/images/dummy_qr_bitcoin_delete.png';
    producto2.valor = 30;
    producto2.direccionBilletera = 'Tasd2aTW3qH43MghkI24OASD3CvXC22WVASD';

    let producto3 = new Producto();
    producto3.id = 1;
    producto3.nombre = 'Suscripción InvestCorp2';
    producto3.descripcion =
      'Suscripcion mensual para adquirir todos los beneficios de InvestCorp';
    producto3.urlIcono =
      '/assets/images/icono_producto_inversion_investcorp.png';
    producto3.urlQr = '/assets/images/dummy_qr_bitcoin_delete.png';
    producto3.valor = 30;
    producto3.direccionBilletera = 'Tasd2aTW3qH43MghkI24OASD3CvXC22WVASD';
    this.productos.push(producto2);
    this.productos.push(producto3);
  }

  
  getProductos(){
    this.productService.get("/api/getAll").subscribe(
      (res)=>{
        if(res!=undefined && res!=null){
          /** La idea es que retorne el array de productos en formato json*/
          this.productosInfo=res
        }
      },(error)=>{
        console.log(error);
      });
  }


}
