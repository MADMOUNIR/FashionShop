import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category';
import { Result } from '../models/result';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categories : Category[];
  categorySubject = new Subject<Category[]>();

  constructor(private http : HttpClient)
  {
     //récupérer les catégories
     this.getCategorieFromServer();

  }

  emitCategory() : void
  {
    this.categorySubject.next(this.categories);
  }

  getCategorieFromServer()
  {
    const url = `${environment.api+'category'+'?API_KEY='+environment.api_key}`;
    this.http.get(url).subscribe(
      (response : Result) =>
      {
        if(response.status == 200)
        {
          this.categories = response.result ;
          this.emitCategory();
        }
        else
        {
          console.log(response.message);

        }

       }

    );


  }
}
