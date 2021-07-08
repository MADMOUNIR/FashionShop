import { Injectable } from '@angular/core';
import { Cart } from '../models/cart';
import { CartData } from '../models/cart-data';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart : Cart[] ;
  cartData : CartData ;
  constructor() {

   // this.cartData = { qty :0 , totalCost : 0} ;
    this.initCart();

   }


  updateDataCart()
  {
    let qty = 0 ;
    let totalCost = 0 ;

    this.cart.forEach(element => {
      qty += element.qty ;
      totalCost += element.product.price * element.qty ;
    });

    this.cartData.qty = qty ;
    this.cartData.totalCost = parseFloat(totalCost.toFixed(2));  ;

    //Sauvegarder les données en local (bug rafraichissement)
    if(typeof(localStorage) !== "undefined")
    {
      localStorage.setItem('cart' , JSON.stringify(this.cart));
      localStorage.setItem('cartData' , JSON.stringify(this.cartData));
    }

  }

  //--------------Ajouter un produit dans le panier -----------------//

  addProductToCart(prod : Product) : void
  {
    const checkProduct = this.cart.find(element =>element.product == prod) ;
    if (checkProduct)
    {
      checkProduct.qty ++ ;
    }
    else
    {
    const   newProduct  =  {
                        qty : 1 ,
                        product : prod
                      }
      this.cart.push(newProduct);
    }

    this.updateDataCart();

  }

    //--------------supprimer un produit dans le panier -----------------//

  deleteProductFromCart(productToDelete : Product) : void
  {
    const indexProduct = this.cart.findIndex(e => e.product == productToDelete);
    //console.log("indexProduct :"+ indexProduct) + " qty" + this.cart[indexProduct].qty ;


    if(indexProduct != -1)
    {
      if(this.cart[indexProduct].qty > 1)
      {
        this.cart[indexProduct].qty -- ;
      }
      else
      {
        this.cart.splice(indexProduct , 1) ;
      }
    }
    this.updateDataCart();

  }

   //--------------Initialisation du panier depuis le local de l'utilisateur -----------------//

  initCart() : void
  {
    const newCartData : CartData = { qty :0 , totalCost : 0};
    if(typeof(localStorage) !== "undefined")
    {
      const cart = JSON.parse(localStorage.getItem('cart'));
      const cartData = JSON.parse(localStorage.getItem('cartData'));

      this.cart = cart ? cart : [] ;
      this.cartData = cartData ? cartData : newCartData;
    }
    else
    {
      this.cart =  [] ;
      this.cartData = newCartData ;
    }


  }

   //--------------supprimer un element du panier -----------------//
  removeElementOfCart(index: number): void{
    this.cart.splice(index,1);
    this.updateDataCart();
  }
}
