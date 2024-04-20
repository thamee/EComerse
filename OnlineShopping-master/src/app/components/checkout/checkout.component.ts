import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SalesProduct } from 'src/app/models/sales-product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  constructor(private productService: ProductService,private router: Router,private toastr: ToastrService) { }
  orderedProducts!: SalesProduct[];
  productLables!:string[]
  shippingAddress:string | undefined
  ngOnInit(): void {
    this.productLables=["Name","model","color","price","quantity"];
    this.getOrderedProducts()
   
  }
  getOrderedProducts(){
    this.productService.getSales().subscribe((products:SalesProduct[]) => {
      this.orderedProducts=products;
     
  });
  }
  calculateTotal(): number {
    let total = 0;
  
    // Calculate the total amount based on the prices and quantities of ordered products
    for (const sales of this.orderedProducts) {
      total += sales.product.price * sales.quantity;
    }
  
    // Add shipping cost if applicable
    // Here you can include logic to calculate shipping cost based on the shipping address or any other criteria
    // For example:
    // if (this.shippingAddress) {
    //   total += SHIPPING_COST;
    // }
  
    return total;
  }
  removeProduct(product:any){

  }
  addOrder(){
    this.productService.conformSales().subscribe(() => {
      this.toastr.success('!', 'Products Ordered Successfully!');
      this.router.navigateByUrl(`/`);
     
  });
  }

}
