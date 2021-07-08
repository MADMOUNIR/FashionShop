import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { CartService } from 'src/app/services/cart.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup ;
  errorMessage;

  constructor(private userService : UsersService , private fb : FormBuilder , private router :Router , private cartService : CartService) { }

  ngOnInit(): void {
    this.initFormLogin();
  }


//Init form login
  initFormLogin() : void
 {
   this.loginForm = this.fb.group({
    email : this.fb.control('' ,[ Validators.email  , Validators.required] ) ,
    password : this.fb.control('' , [Validators.minLength(6) ,  Validators.required ]),

   });

 }



onSubmit() : void
{
  const email = this.loginForm.get('email').value ;
  const password = this.loginForm.get('password').value ;
  const newUser : User  = {email : email , password :password} ;

  //Appel au service d'authent
  this.userService.authentifier(newUser).then(
    (data) => {
      //On vérifie s'il y a des chose dans le panier on redirige vers le checkout, sinon on rederige vers shop
      if(this.cartService.cartData.qty > 0 )
      {
        this.router.navigate(['/checkout']);

      }
      else
      {
        this.router.navigate(['/shop']);
      }

    }

  ).catch( (error) => {
    this.errorMessage = error ;
    setTimeout(() => {
      this.errorMessage = null;

    }, 3000);
    console.log("erreur d'authentification :"+error);

  }
  );






}


}
