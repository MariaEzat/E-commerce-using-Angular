import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private _AuthService:AuthService ,private _Router:Router,private _FormBuilder:FormBuilder){}

  msgError:string=''
  isLoading:boolean=false

 /* loginForm:FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)]),
  })
*/
  loginForm:FormGroup=this._FormBuilder.group({
    email:[null,[Validators.required,Validators.email]],
    password:[null,[Validators.required]]
})

  HandleForm():void{

    if(this.loginForm.valid)
      {
        this.isLoading=true
         this._AuthService.setLogin(this.loginForm.value).subscribe({
          next:(response)=>{
            this.isLoading=false
            localStorage.setItem('eToken',response.token)
            this._AuthService.saveUserData();
            this._Router.navigate(['/home'])
          },
          error:(err:HttpErrorResponse)=>{
            this.isLoading=false
            this.msgError=err.error.message}
    })
  }
  else{
    this.loginForm.markAllAsTouched()
  }
  }
}
