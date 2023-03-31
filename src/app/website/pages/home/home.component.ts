import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  productId: string | null = null;
  products: Product[] = [];
  limit = 10;
  offset = 0;

  constructor(
    private productService : ProductsService,
    private activatedRoute: ActivatedRoute
  ){ }

  ngOnInit(): void {
    this.onLoadMore();
    this.onLoadProduct();
  }

  onLoadMore() {
    // console.log(this.limit, ' | ', this.offset);
    this.productService.getAll(this.limit, this.offset)
    .subscribe(data => {
      // this.products = data; // Sobreescribiendo
      this.products = this.products.concat(data); // Concatenando
      this.offset += this.limit;
    })
  }

  onLoadProduct() {
    this.activatedRoute.queryParamMap
    .subscribe(data => {
      this.productId = data.get('product');
      console.log(this.productId);
    })
  }

}
