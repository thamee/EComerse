import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { SalesProduct } from 'src/app/models/sales-product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private actRoute: ActivatedRoute,
    private router: Router,private toastr: ToastrService)
   {}
  product!: Product;
  sales!: SalesProduct;

  quantity=1;
  ngOnInit(): void {
    this.getProductDetail();
  }
  getProductDetail() {
    this.actRoute.paramMap.subscribe((res) =>
      this.productService
        .getProduct(res.get('id'))
        .subscribe((product: Product) => {
          this.product = product;
        })
    );
  }
  addToCart(){
    if(this.product.isOutOfStock){
      this.toastr.error('!', 'Product is out of Stock!');
    }
    else{
      this.productService
      .addSales(this.product,this.quantity)
      .subscribe(() => {
        this.toastr.success('!', 'Product Added To Cart!');
        this.router.navigateByUrl(`/`);
  });
    }
   
}
}
