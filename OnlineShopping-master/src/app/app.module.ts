import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddProductComponent } from './components/add-product/add-product/add-product.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { ViewProductComponent } from './components/view-product/view-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { JwtModule } from "@auth0/angular-jwt";
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { RegisterComponent } from './components/register/register.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../app/auth/token.interceptor';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


export function tokenGetter() {
  return localStorage.getItem("access_token");
}

@NgModule({
  declarations: [
    AppComponent,
    AddProductComponent,
    HomeComponent,
    ViewProductComponent,
    EditProductComponent,
    ProductDetailsComponent,
    LoginComponent,
    MenuComponent,
    RegisterComponent,
    CheckoutComponent,
    
  ],
  imports: [
    BrowserModule,HttpClientModule,CommonModule,
    AppRoutingModule,FormsModule, BrowserAnimationsModule,
    ToastrModule.forRoot(), 
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      },
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
