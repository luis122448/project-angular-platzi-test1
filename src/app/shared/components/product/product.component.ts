import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent{

  // Inicializando Arreglo
  @Input() product : Product = {
    id: '',
    title: '',
    images: [],
    price: 0,
    description: '',
    category: {
      id: 0,
      name: ''
    }
  }
  // Nombre de como lo recibe, o lee desde el Padre
  @Output() addCartProduct = new EventEmitter<Product>();
  @Output() showDetail = new EventEmitter<string>();

  // Asignando nombre especial
  // @Input('myProduct') product : Product = {
  //   id: '',
  //   name: '',
  //   image: '',
  //   price: 0
  // }

  onAddCart(){
    this.addCartProduct.emit(this.product);
  }

  onShowDetail(){
    // Prodriamos emitir toda la INFO
    // this.showDetail.emit(this.product);
    this.showDetail.emit(this.product.id);
  }

}
