import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product.model';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categoryId: string | null = null;
  productId: string | null = null;
  limit = 10;
  offset = 0;
  products: Product[] = [];
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
  showProductDetail = false;

  constructor(
    private activateRoute: ActivatedRoute,
    private productService: ProductsService
  ){ }

    ngOnInit(): void {
        this.onLoadMore();
        this.onLoadDetails();
    }

  // ngOnInit(): void {
  //     this.activateRoute.paramMap
  //     .subscribe(data =>{
  //       this.categoryId =  data.get('id'); // El nombre debe ser Identico al definido en el Routing
  //     })
  //     if ( this.categoryId ) {
  //       this.productService.getByCategory(this.categoryId, this.limit, this.offset)
  //       .subscribe(data => {
  //         this.products = data;
  //         this.offset += this.limit;
  //       })
  //     }
  // }

  // onLoadMore(){
  //   this.activateRoute.paramMap
  //     .subscribe(data =>{
  //       this.categoryId =  data.get('id'); // El nombre debe ser Identico al definido en el Routing
  //     })
  //     if ( this.categoryId ) {
  //       this.productService.getByCategory(this.categoryId, this.limit, this.offset)
  //       .subscribe(data => {
  //         this.products = this.products.concat(data); // Concatenando
  //         this.offset += this.limit;
  //       })
  //     }
  // }

  onLoadMore(){
    this.activateRoute.paramMap
    .pipe(
      switchMap(data => {
        this.categoryId = data.get('id');
        if (this.categoryId) {
          return this.productService.getByCategory(this.categoryId, this.limit, this.offset);
        }
        return [];
      }))
    .subscribe((data) =>{
      this.products = this.products.concat(data);
      this.offset += this.limit;
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

  onToogleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  onLoadDetails(){
    this.activateRoute.queryParamMap
    .subscribe((data) => {
      this.productId = data.get('product');
    })
  }

}
