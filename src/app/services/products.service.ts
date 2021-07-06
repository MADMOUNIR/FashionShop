import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';
import { Result } from '../models/result';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  products  : Product[] = [] ;
  productSubject : Subject<Product[]> = new Subject<Product[]>();
  numberOfProductByPage : number = 6 ;
  pages : number[] = [] ;

  constructor(private http : HttpClient) {
    //récupérer les produits
    this.getProductsFromServer();

   }

     //----------Récupération des produits depuis le serveur---------------//

   getProductsFromServer() {

    const url = `${environment.api+'products'+'?API_KEY='+environment.api_key}`;
    this.http.get(url).subscribe(

      (data : Result) => {
        if(data.status == 200)
        {
          this.products = data.result ;
          this.emitProduct();
          console.log("produit récupérer avec succès !");

        }
        else
        {
          console.log("erreur recup product :"+data.message);
        }

      }
    );

   }

     //----------mise à jour de l'observable---------------//
     emitProduct() {
       this.productSubject.next(this.products);
     }


    //----------récupérer le produit par ID--------------//
     getProductById(id : number) : Product
     {
        const product = this.products.find(element => element.idProduct == id);
        if(product)
        {
          return product ;
        }
        return null ;
     }

      //----------récupérer le produit par Page--------------//
      getProductByPage(numPage : number) : Product[]
      {
        //Nombre total des pages
        const nbPage = this.products.length / this.numberOfProductByPage ;
        if(numPage >= 0 && numPage < nbPage)
        {
          const prodResult = this.products.slice(numPage * this.numberOfProductByPage , (numPage + 1) * this.numberOfProductByPage );
          return prodResult ;
        }
        return null ;

      }

      //initialiser le tableau des pages
      initPageTableau() : void
      {
        let i : number = 0 ;
        for (let index = 0; index < this.products.length; index+ this.numberOfProductByPage ) {
         this.pages.push(i);
         i = i + 1;
        }
      }

}
