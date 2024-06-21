import { Component, OnInit } from '@angular/core';
import { EcomdataService } from '../../shared/services/ecomdata.service';
import { Product } from '../../shared/interfaces/product';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../shared/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  constructor(private _EcomdataService:EcomdataService , private _CartService:CartService, private _ToastrService:ToastrService){}
  products:Product[]=[]
  categories:any[]=[]
  searchTerm:string=''

  addToCart(id:string):void{
    this._CartService.addToCart(id).subscribe({
      next:(response)=>{
        this._ToastrService.success(response.message,'Fresh Cart') 
        this._CartService.cartNumber.next(response.numOfCartItems); 
      },
      error:(err)=>{
        console.log(err)
      }
    })

  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay:true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  }

  minSlider: OwlOptions = {
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

  ngOnInit(): void {
    this._EcomdataService.getAllData().subscribe({
      next:(response)=>{
        this.products=response.data 
      }
    })

    this._EcomdataService.getAllCategories().subscribe({
      next:(response)=>{
        this.categories=response.data
      }
    })
  }

}
