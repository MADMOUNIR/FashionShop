import { BrowserModule } from '@angular/platform-browser';
import { Component, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http' ;

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ShopComponent } from './shop/shop.component';
import { ProductsComponent } from './shop/products/products.component';
import { SingleProductComponent } from './shop/single-product/single-product.component';
import { CartComponent } from './shop/cart/cart.component';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { AddToCartComponent } from './shop/add-to-cart/add-to-cart.component';
import { ModalQuickViewComponent } from './shop/modal-quick-view/modal-quick-view.component';
import { CategoryComponent } from './category/category.component' ;
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CheckoutComponent } from './shop/checkout/checkout.component';
import { AuthGuard } from './services/auth.guard';
import { ButtonPaypalComponent } from './shop/button-paypal/button-paypal.component';
import { NgxPayPalModule } from 'ngx-paypal';


const routes :  Routes = [
 { path : 'home' , component :  HomeComponent} ,
 { path : 'shop' , component : ShopComponent} ,
 { path : 'cart' , component : CartComponent} ,
 { path : 'contact' , component : ContactComponent} ,
 { path : 'checkout' ,canActivate : [AuthGuard], component : CheckoutComponent} ,
 { path : 'single-product/:id' , component : SingleProductComponent} ,
 { path : 'login' , component : LoginComponent} ,
 { path : 'register' , component : RegisterComponent} ,
 { path : 'category/:id' , component : CategoryComponent} ,
 { path : 'notFound' , component : NotFoundComponent} ,
 { path : '' , component : ShopComponent} ,
 { path : '**' , redirectTo : 'not-found' , pathMatch : 'full'} ,

]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ContactComponent,
    LoginComponent,
    RegisterComponent,
    ShopComponent,
    ProductsComponent,
    SingleProductComponent,
    CartComponent,
    NotFoundComponent,
    AddToCartComponent,
    ModalQuickViewComponent,
    CategoryComponent,
    CheckoutComponent,
    ButtonPaypalComponent
  ],
  imports: [
    BrowserModule ,
    RouterModule.forRoot(routes) ,
    HttpClientModule ,
    ReactiveFormsModule ,
    FormsModule,
    NgxPayPalModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
