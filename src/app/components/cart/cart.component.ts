import { Component, OnInit } from '@angular/core';
import { CartService } from '../../shared/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  constructor(private _CartService:CartService ){}
  cartDetails:any={}
  Removeitem(id:string):void{
    this._CartService.RemoveCartItem(id).subscribe({
      next:(response)=>{
        this.cartDetails=response.data
        this._CartService.cartNumber.next(response.numOfCartItems)
      },error:(err)=>{
        console.log(err)
      }
    })
  }

  ChangeItem(id:string,count:number):void{
    if(count>0)
      {
        this._CartService.UpdateCartItem(id,count).subscribe({
          next:(respose)=>{
            this.cartDetails=respose.data
          },
          error:(err)=>{
            console.log(err)
          }
        })
      }
  }

  ngOnInit(): void {
    this._CartService.getCart().subscribe({
      next:(response)=>{
        this.cartDetails=response.data
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
}
