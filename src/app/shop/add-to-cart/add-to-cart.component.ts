import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css']
})
export class AddToCartComponent implements OnInit {

  @Input() products : Product[]  ;
  prefImageUrl = `${environment.prefImageUrl}`

  constructor() { }

  ngOnInit(): void {
  }

}
