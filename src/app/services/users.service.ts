import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Result } from '../models/result';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  user : User ;
  userSubject = new Subject<User>();
  isAuth : boolean = false ;
  userName ;

  constructor(private http  : HttpClient)
  {

  }

  emitUser() : void
  {
    this.userSubject.next(this.user) ;
  }

  //Authentifier un utilisateur
  authentifier(newUser : User)
  {
    return new Promise(
      (resolve,reject) => {
        const url = `${environment.api+'authentifier.php'+'?API_KEY='+environment.api_key}` + '&email=' + newUser.email + '&password='+ newUser.password;

        this.http.get(url).subscribe(
          (data : Result) => {
            if(data.status == 200)
            {
              //Athentification réussi
              this.user = data.result ;
              this.isAuth = true;
              this.userName = data.result.firstname;
              this.emitUser();
              resolve(data.result);
            }
            else
            {
             //erreur d'authentification
              console.log(data.result);
              reject(data.message);
            }
          },
          (error) => {
            console.log("error :"+error);
            reject(false);

          }
        );
      }
    );
  }

    //Créer  un utilisateur
    createUser(newUser : User)
    {
      return new Promise(
        (resolve,reject) =>
        {
          const url = `${environment.api + 'createUsers.php' +'?API_KEY='+ environment.api_key}` +
        '&email=' + newUser.email + '&password=' + newUser.password + '&sexe=' + newUser.sexe +
        '&firstname=' + newUser.firstName + '&lastname=' + newUser.lastName + '&dateBirth=' +
        newUser.dateBirth + '&pseudo=' + newUser.pseudo;

        console.log("url backend :"+url);
        this.http.get(url).subscribe(
          (data : Result) => {
            if(data.status == 200)
            {
             //this.authentifier(newUser) ;
             this.user = data.args ;
             this.isAuth = true;
             this.emitUser();
             resolve(data.result);
            }
            else
            {
              reject(data.message);
              console.log(data.message);

            }
          },
          (error) => {
            console.log("error :"+error);
            reject(error);

          }
        );


        }

      );
    }

    logout() : void
    {
      this.user = null ;
      this.isAuth = false;
      this.userSubject = new Subject<User>();
    }


}
