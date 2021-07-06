import { Component, Input, OnDestroy, OnInit } from '@angular/core';
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
export class ProductsComponent implements OnInit  {

  prodSub : Subscription;
  pageSub : Subscription ;
  //Accepter un tableau de produits comme paramètre
  @Input() products : Product[] =[];
  @Input() isPaginate : boolean = true ;
  prefImageUrl = `${environment.prefImageUrl}` ;
  curentPage : number = 0 ;
  pages = [1,2,3,4,5,6,7,8,9,10];

  constructor(private prodService : ProductsService , private cartService : CartService) {

   }

  ngOnInit(): void {




  }

  //On écoute plus prodSub
  // ngOnDestroy() : void {
  //   this.prodSub.unsubscribe();
  // }

//--------------Getion du Panier ----------------------//
  addToCart(product : Product) : void
  {
    this.cartService.addProductToCart(product) ;
  }

  deleteFromCart(product :Product) : void
  {
    this.cartService.deleteProductFromCart(product) ;
  }

  //--------------Getion de la pagination ----------------------//

  changePage(numberPage : number) : void
  {
    const listProd = this.prodService.getProductByPage(numberPage) ;
    if(listProd)
    {
      this.products = listProd ;
    }
    this.curentPage = numberPage ;

  }

  nextPage() : void
  {

    const newCurrentPage = this.curentPage + 1 ;
    const listProd = this.prodService.getProductByPage(newCurrentPage) ;
    if(listProd)
    {
      this.products = listProd ;
      this.curentPage = newCurrentPage ;
    }
  }

  prevPage() : void
  {
    const newCurrentPage = this.curentPage - 1 ;
    const listProd = this.prodService.getProductByPage(newCurrentPage) ;
    if(listProd)
    {
      this.products = listProd ;
      this.curentPage = newCurrentPage ;
    }

  }



}
