import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../models/product';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit , OnDestroy {

  products : Product[] ;
  productSub : Subscription;
  categorieName ;
  categorieId ;

  constructor(private route : ActivatedRoute ,
              private productService : ProductsService)
  {

  }

  // ngOnInit(): void {
  //   this.route.params.subscribe(
  //     (request) =>
  //     {
  //       console.log(request.id);
  //       this.categorieId = request.id ;
  //       this.productSub = this.productService.productSubject.subscribe(
  //         (data : Product[]) =>
  //         {
  //           const prod = data.filter( product => {
  //             return product.Category == +request.id
  //           });
  //           console.log(prod);
  //           this.products = prod;
  //         }
  //       );
  //       this.productService.emitProduct();

  //     }
  //   );
  // }

  ngOnInit(): void {
    this.route.params.subscribe(
      (request)=>{
        console.log(request.id);
        this.productSub = this.productService.productSubject.subscribe(
          (data: Product[])=>{

            console.log("produit data :");
            console.log(data);
            const prod = data.filter(product =>{
              return product.Category == +request.id
            });
            console.log(prod);
            this.products = prod;

          }
        );
        this.productService.emitProduct();


      }
    )
  }


  ngOnDestroy() : void {
    this.productSub.unsubscribe();
  }

}
