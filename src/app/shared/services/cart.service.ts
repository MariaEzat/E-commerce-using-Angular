import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  cartNumber:BehaviorSubject<number> = new BehaviorSubject(0)
  constructor(private _HttpClient:HttpClient) { }
  addToCart(productId:string):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/cart`,
      {productId:productId})

  }

  getCart():Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/cart`)
  }

  RemoveCartItem(itemId:string):Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${itemId}`
    )

  }

  UpdateCartItem(itemId:string ,count:number):Observable<any>{
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${itemId}`,
      {count:count}
    )

  }

  CheckOutCart(cardId:string ,userData:object):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cardId}?url=http://localhost:4200`,
      {
        shippingAddress:userData
      }
    )

  }
}
