import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-det',
  templateUrl: './product-det.component.html',
  styleUrls: ['./product-det.component.scss']
})
export class ProductDetComponent implements OnInit {

  product: Product = {
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
  productId : string | null = null;
  indexImgActivate = 0;
  constructor(
    private activateRoute: ActivatedRoute,
    private productsService: ProductsService,
    private location: Location
  ){}

  ngOnInit(): void {
    this.onLoadMore();
  }

  onLoadMore(){
  this.activateRoute.paramMap
  .pipe(
    switchMap(data => {
      this.productId = data.get('id');
      if (this.productId) {
        return this.productsService.getById(this.productId);
      }
      return [];
    }))
  .subscribe((data) =>{
    this.product = data;
  })}

  onPrevImage() {
    if (this.indexImgActivate > 0) {
      this.indexImgActivate -= 1;
    } else {
      this.indexImgActivate = this.product.images.length-1;
    }
  }

  onNextImage() {
    if (this.indexImgActivate<this.product.images.length-1) {
      this.indexImgActivate += 1;
    } else {
      this.indexImgActivate = 0;
    }
  }

  onToBack(){
    this.location.back();
  }

}
