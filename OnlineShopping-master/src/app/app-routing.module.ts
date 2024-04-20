import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './components/add-product/add-product/add-product.component';
import { HomeComponent } from './components/home/home.component';
import { ViewProductComponent } from './components/view-product/view-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

import { 
  AuthGuardService as AuthGuard 
} from './auth/auth-guard.service';

const routes: Routes = [
  {path: 'add-product', component: AddProductComponent},
  {path: 'view-product', component: ViewProductComponent,canActivate: [AuthGuard]},
  {path: 'edit-product/:id', component: EditProductComponent,canActivate: [AuthGuard]},
  {path: 'product-details/:id', component: ProductDetailsComponent,canActivate: [AuthGuard]},
  {path: 'checkout', component: CheckoutComponent,canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '', component: HomeComponent,canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
