import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cart } from '../models/cart';
import { Category } from '../models/category';
import { Product } from '../models/product';
import { CartService } from '../services/cart.service';
import { CategoryService } from '../services/category.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  cart : Cart[] = [] ;
  cartData ;
  categories : Category[] ;
  categorySub : Subscription ;
  isAuth = false;
  userName;
  @Input() title : string;
  constructor(private cartService : CartService ,
              private categoryService : CategoryService ,
              private userService : UsersService) { }

  ngOnInit(): void
  {
    this.cart = this.cartService.cart ;
    this.cartData = this.cartService.cartData ;
    this.isAuth = this.userService.isAuth ;
   if(this.isAuth)
   {
    this.userName = this.userService.userName ;
    console.log( this.userService.user);

   }


    // Récupération des catégories
    this.categorySub = this.categoryService.categorySubject.subscribe(
    (data : Category[]) => {
    this.categories = data ;
    }
    );
    this.categoryService.emitCategory();


  }
  lougout() : void
  {
    this.userService.logout();
    this.isAuth = this.userService.isAuth;
  }



}
