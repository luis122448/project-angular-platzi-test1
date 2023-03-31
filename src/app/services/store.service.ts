import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private myShoppingCart: Product[] = [];
  private myCart = new BehaviorSubject<Product[]>([]);

  // Definiendo un Observable Name + $
  myCart$ =  this.myCart.asObservable();

  totalPrice = 0.0;

  onAddToShoppingCart(product: Product){
    this.myShoppingCart.push(product);
    // Transmitiendo el estado de Lista
    this.myCart.next(this.myShoppingCart);
  }

  getTotal() {
    return this.myShoppingCart.reduce((sum, item) => sum + item.price, 0);
  }

  getMyShoppingCart() {
    return this.myShoppingCart;
  }

}
