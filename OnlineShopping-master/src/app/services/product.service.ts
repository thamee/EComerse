import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product } from '../models/product';
import { SalesProduct } from '../models/sales-product';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  private baseUrl = 'https://localhost:5001'; 
  
  // get all the languages for the dropdown
  getProductCategories():any {
   let reponse=this.http.get(`${this.baseUrl}/categories`);
   return reponse;
   
 }
 addProduct(product:Product):any {
  

    return this.http.post(`${this.baseUrl}/product`, product);
}
updateProduct(product:Product):any {
  let reponse=this.http.patch(`${this.baseUrl}/products/${product.id}`,{
    id:product.id,
    name:product.name,
    mobile:product.color,
    model : product.model,
    price : product.price,
    color : product.color,
    categoryId : product.categoryId,
    isOutOfStock:product.isOutOfStock


  });
  return reponse;
}

uploadProductImage(productId: number, image: File): Observable<any> {
  debugger
  const formData = new FormData();
  formData.append('image', image, image.name);
 
  return this.http.post(`${this.baseUrl}/product/${productId}/image`, formData);
}


getAllProducts(category?: string, pageNumber?: string): any {
  let params = new HttpParams();
  if (category) {
    params = params.set('category', category);
  }
  if (pageNumber) {
    params = params.set('pageNumber', pageNumber);
  }
  debugger
  return this.http.get<Product[]>(`${this.baseUrl}/products`, { params: params });
}


getProduct(Id:string|null):any {
  let reponse=this.http.get(`${this.baseUrl}/products/${Id}`);
  return reponse;
 }
 deleteProduct(Id:string|null):any {
  let reponse=this.http.delete(`${this.baseUrl}/products/${Id}`);
  return reponse;
 }

 addSales(product:Product,quantity:number):any {
  let reponse=this.http.post(`${this.baseUrl}/sales`,{
    productId:product.id,
    quantity:quantity
  

  });
  return reponse;
}


getSales():any {
  let reponse=this.http.get(`${this.baseUrl}/sales`);
  return reponse;
}

conformSales():any {
  let reponse=this.http.post(`${this.baseUrl}/order`,{});
  return reponse;
}

}
