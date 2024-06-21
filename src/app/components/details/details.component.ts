import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EcomdataService } from '../../shared/services/ecomdata.service';
import { Product } from '../../shared/interfaces/product';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../shared/services/cart.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit{
  constructor(private _ActivatedRoute:ActivatedRoute,private _EcomdataService:EcomdataService,private _CartService:CartService){}

  addToCart(id:string):void{
    this._CartService.addToCart(id).subscribe({
      next:(response)=>{
        console.log(response)
      },
      error:(err)=>{
        console.log(err)
      }
    })

  }
  ProductSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay:true,
    navSpeed: 700,
    navText: ['', ''],
    items:1,
    nav: false
  }
  productDetails:Product={}as Product;
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        let idProduct:any=params.get('id')
        
        this._EcomdataService.getProductDetails(idProduct).subscribe({
          next:(response)=>{
            this.productDetails=response.data
          }
        })  

      }
    })
  }

}
