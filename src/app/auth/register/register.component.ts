import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm : FormGroup;
  errorMessage : string;
  successMessage: any;

  constructor(private userService : UsersService , private fb : FormBuilder , private router :Router) { }

  ngOnInit(): void
  {
    this.initRegisterForm();
  }

  //initialiser le formulaire
  initRegisterForm() : void
  {
    this.registerForm =  this.fb.group({
      sexe: this.fb.control('', [ Validators.required]),
      pseudo: this.fb.control('', [ Validators.required]),
      lastname: this.fb.control('', [ Validators.required]),
      firstname: this.fb.control('', [ Validators.required, Validators.minLength(5)]),
      email: this.fb.control('', [ Validators.required, Validators.email]),
      password: this.fb.control('', [ Validators.required, Validators.minLength(6)]),
      dateBirth: this.fb.control('', [ Validators.required]),
    }
    )

  }

  onSubmit() : void
  {
    const sexeUser = this.registerForm.get('sexe').value;
    const pseudoUser = this.registerForm.get('pseudo').value;
    const firstnameUser = this.registerForm.get('firstname').value;
    const lastnameUser = this.registerForm.get('lastname').value;
    const emailUser = this.registerForm.get('email').value;
    const passwordUser = this.registerForm.get('password').value;
    const dateBirthUser = this.registerForm.get('dateBirth').value;

    const newUser: User = {
      sexe: sexeUser,
      firstName: firstnameUser,
      lastName: lastnameUser,
      email: emailUser,
      password: passwordUser,
      dateBirth: dateBirthUser,
      pseudo: pseudoUser
  }

  //créeation de l'utilisateur
  this.userService.createUser(newUser).then(
    (data) => {
      //utilisateur crée  => redirection vers shop
      this.errorMessage = null ;
      this.successMessage = data + " ... redirection vers le shop ...." ;
      setTimeout(() => {
        this.router.navigate(['/shop']);
      }, 2000);


    }
  ).catch(
    (error) => {
      this.errorMessage = error ;
      setTimeout(() => {
        this.errorMessage = null;
      }, 3000);
      console.log("erreur de regestration :"+error);

    }
  )
}


}
