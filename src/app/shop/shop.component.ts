import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../models/product';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit , OnDestroy {

  products : Product[] =[];
  prodSub : Subscription;

  constructor(private prodService : ProductsService) {

   }

  ngOnInit(): void {

    this.prodSub = this.prodService.productSubject.subscribe(
      (data ) => {
        this.products =  this.prodService.getProductByPage(0) ; //data;
        //console.log(this.products);

      }

    );
    this.prodService.emitProduct();

  }

  ngOnDestroy() : void {
    this.prodSub.unsubscribe();
  }


}
