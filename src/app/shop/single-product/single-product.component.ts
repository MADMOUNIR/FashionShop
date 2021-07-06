import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
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
  prefImageUrl = `${environment.prefImageUrl}`;
  productSub : Subscription ;

  constructor(private route : ActivatedRoute ,
              private prodService : ProductsService ,
              private cartService : CartService)
  {


  }

  ngOnInit(): void {
    window.scrollTo(0,0);
    const id = +this.route.snapshot.params["id"] ; // pour forcer la conversion vers entier


    this.productSub = this.prodService.productSubject.subscribe(
      (data : Product[]) =>
      {
        this.product = this.prodService.getProductById(id);
      }
    );
    this.prodService.emitProduct();

  }

  addCart(product: Product): void{
    this.cartService.addProductToCart(product);
  }

}
