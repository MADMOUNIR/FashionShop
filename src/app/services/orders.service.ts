import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cart } from '../models/cart';
import { Result } from '../models/result';
import { User } from '../models/user';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http : HttpClient , private cartService : CartService) { }

  createOrders(user: User, cart: Cart[]){
    return new Promise(
      (resolve,reject)=>{
        cart.forEach((data)=>{
          const price = data.qty * data.product.price;

          const url = `${environment.api + "createOrders.php?API_KEY=" + environment.api_key}` +
          '&idUser=' + user.idUser + '&idProduct=' + data.product.idProduct + '&quantity=' + data.qty +
          '&price=' + price ;

          this.http.get(url).subscribe(
            (response: Result)=>{
              if(response.status == 200){
                this.cartService.removeElementOfCart(0);
                if(cart.length == 0){
                  resolve(true);
                }
              }else{
                reject(response.message);
              }
            },
            (error)=>{
              reject("Error : " + error);
            }
          )


        });//end foreach
      }
    )
  }
}
