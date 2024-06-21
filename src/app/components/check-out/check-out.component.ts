import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../shared/services/cart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.css'
})
export class CheckOutComponent implements OnInit{

  constructor(private _FormBuilder:FormBuilder ,private _ActivatedRoute:ActivatedRoute ,private _CartService:CartService){}
  CheckOut :FormGroup = this._FormBuilder.group({
    details:[''],
    phone:[''],
    city:['']
  })

  CartId:any=''

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        this.CartId=params.get('id')
      }
    })
  }

  HandlForm():void{
    this._CartService.CheckOutCart(this.CartId,this.CheckOut.value).subscribe({
      next:(response)=>{
        if(response.status=='success') {
          window.open(response.session.url,'_self')
        } 
      }
    })
  }
}
