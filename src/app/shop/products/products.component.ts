import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit , OnDestroy {

  prodSub : Subscription;
  products : Product[] =[];
  prefImageUrl = `${environment.prefImageUrl}`
  constructor(private prodService : ProductsService , private cartService : CartService) {

   }

  ngOnInit(): void {

    this.prodSub = this.prodService.productSubject.subscribe(
      (data ) => {
        this.products = data;
        console.log(this.products);
      }
    );
    this.prodService.emitProduct();

  }
  ngOnDestroy() : void {
    this.prodSub.unsubscribe();
  }

//--------------Getion du Panier ----------------------//
  addToCart(product : Product) : void
  {
    this.cartService.addProductToCart(product) ;
  }

  deleteFromCart(product :Product) : void
  {
    this.cartService.deleteProductFromCart(product) ;
  }

}
