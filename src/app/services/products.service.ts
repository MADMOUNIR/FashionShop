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
  productSubject : Subject<Product[]> = new Subject<any[]>();

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
}
