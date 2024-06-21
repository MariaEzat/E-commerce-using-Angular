import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { CartService } from '../../shared/services/cart.service';

@Component({
  selector: 'app-nav-blank',
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.css'
})
export class NavBlankComponent implements OnInit {

  constructor(private _AuthService:AuthService,private _CartService:CartService){}
  cartCount:number=0;
  ngOnInit(): void {
    this._CartService.cartNumber.subscribe({
      next:(data)=>{this.cartCount=data}
    })

    this._CartService.getCart().subscribe({
      next:(response)=>{this._CartService.cartNumber.next(response.numOfCartItems)}
    })
  }
  logOutUser():void
  {
    this._AuthService.logOut();
  }
}
