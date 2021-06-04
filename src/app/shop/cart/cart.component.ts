import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/cart';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
cart : Cart[] ;
prefImageUrl = `${environment.prefImageUrl}`

  constructor(private cartService : CartService) { }

  ngOnInit(): void {

    this.cart = this.cartService.cart ;
    console.log(this.cart);

  }

  addProduct(product : Product)
  {
    this.cartService.addProductToCart(product);
  }

  deleteProduct(product : Product)
  {
    this.cartService.deleteProductFromCart(product);
  }

}
