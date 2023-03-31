import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product, SaveProductDTO, UpdateProductDTO } from 'src/app/models/product.model';
import { StoreService } from 'src/app/services/store.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent{

  myShoppingCart: Product[] = [];
  totalPrice = 0.0;
  @Input() products: Product[] = [];
  // @Input() productId: string | null = null;
  // Raestrar los cambios en el Input
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('productId') set productId(id: string | null){
    if (id) {
      this.onShowDetail(id);
    }
  }
  @Output() LoadMore: EventEmitter<string> = new EventEmitter();
  productChosen: Product = {
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
  indexImgActivate = 0;
  today = new Date();
  showProductDetail = false;
  statusDetailt: 'loading' | 'success' | 'error' | 'init' = 'init';
  // Patron de Inyeccion de Dependencias
  constructor(
    private storeService: StoreService,
    private productService: ProductsService
  ) {
      this.myShoppingCart =  this.storeService.getMyShoppingCart();
  }

  onLoadMore(){
    this.LoadMore.emit();
  }

  onAddToShoppingCart(product: Product){
    this.storeService.onAddToShoppingCart(product);
    this.totalPrice = this.storeService.getTotal();
  }

  onToogleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: string){
    this.statusDetailt = 'loading';
    if (this.showProductDetail) {
      this.showProductDetail = true;
    }
    this.productService.getById(id)
    .subscribe(data => {
      this.onToogleProductDetail();
      this.productChosen = data;
      this.indexImgActivate = 0;
    }, response => {
      window.alert(response);
      console.log(response.error.message);
      this.statusDetailt = 'error';
    })

  }

  onPrevImage() {
    if (this.indexImgActivate > 0) {
      this.indexImgActivate -= 1;
    } else {
      this.indexImgActivate = this.productChosen.images.length-1;
    }
  }

  onNextImage() {
    if (this.indexImgActivate<this.productChosen.images.length-1) {
      this.indexImgActivate += 1;
    } else {
      this.indexImgActivate = 0;
    }
  }

  onSaveProduct() {
    // Prueba de Concepto
    const saveProductDTO : SaveProductDTO = {
      title: 'Nuevo Producto',
      images: ['https://placeimg.com/640/480/any?random=${Math.random()}'],
      price: 15.00,
      description: 'Descripcion del Nuevo Producto',
      categoryId: 1
    }
    this.productService.postSave(saveProductDTO)
    .subscribe(data => {
      // console.log('Save ', data);
      this.products.unshift(data);
    })
  }

  onUpdateProduct() {
    const updateProductDTO : UpdateProductDTO = {
      title: 'Nuevo Producto v2'
    }
    const id = this.productChosen.id;
    this.productService.putUpdate(id, updateProductDTO)
    .subscribe(data => {
      console.log('Update ', data);
      const productIndex = this.products.findIndex(item => item.id === id);
      this.productChosen = data;
      this.products[productIndex] = data;
    })
  }

  onDeleteProduct() {
    const id = this.productChosen.id;
    this.productService.delDelete(id)
    .subscribe(() => {
      const productIndex = this.products.findIndex(item => item.id === id);
      this.products.splice(productIndex,1);
      this.showProductDetail = false;
    });
  }

}
