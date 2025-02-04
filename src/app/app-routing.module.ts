import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankLayoutComponent } from './components/blank-layout/blank-layout.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoryComponent } from './components/category/category.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CartComponent } from './components/cart/cart.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { authGuard } from './shared/guards/auth.guard';
import { DetailsComponent } from './components/details/details.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { AllordersComponent } from './components/allorders/allorders.component';


const routes: Routes = [
  {path:'' ,canActivate:[authGuard],component:BlankLayoutComponent,children:[
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home',component:HomeComponent},
    {path:'products',component:ProductsComponent},
    {path:'checkout/:id',component:CheckOutComponent},
    {path:'details/:id',component:DetailsComponent},
    {path:'categories',component:CategoryComponent},
    {path:'brands',component:BrandsComponent},
    {path:'setting',loadChildren:()=>import('./setting/setting.module').then((m)=>m.SettingModule)},
    {path:'allorders',component:AllordersComponent},

    {path:'cart',component:CartComponent}
  ]},
  {path:'',component:AuthLayoutComponent,children:[
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent}
  ]},
  {path:'**',component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
