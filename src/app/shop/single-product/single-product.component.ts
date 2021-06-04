import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {

  product : Product ;
  prefImageUrl = `${environment.prefImageUrl}`

  constructor(private route : ActivatedRoute ,
              private prodService : ProductsService ,
              private cartService : CartService)
  {


  }

  ngOnInit(): void {
    const id = +this.route.snapshot.params["id"] ; // pour forcer la conversion vers entier
    this.product = this.prodService.getProductById(id);
  }

  addCart(product: Product): void{
    this.cartService.addProductToCart(product);
  }

}
