import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { MasterData } from 'src/app/models/master-data';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private actRoute: ActivatedRoute,
    private router: Router,
    private authService:AuthService,
    private toastr: ToastrService
  ) {
    const role=authService.getUserRole();
    if(role!="Sellers"){
      this.router.navigateByUrl(`/`);

    }
  }
  product!: Product;
  categories !: MasterData[];
  form = new Product();
  errors=[];
  error = {
    name: '',
    password: null,
  };

  ngOnInit(): void {
    this.getProductDetail();
    this.getCategories()
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
  getCategories()
  {
    this.productService.getProductCategories().subscribe((categories:MasterData[]) => {
      this.categories=categories;
     
  });
  }

  formSubmit() {
    if (this.validate()) {
      this.productService.updateProduct(this.product).subscribe(() => {
        this.toastr.success('!', 'Product Edited Successfully!');
        this.router.navigateByUrl(`view-product`);
      },(error:any)=>{
        this.toastr.error('!', 'Product Edited Failed!');
        if(error && error.error&& error.error.errors)      {
          this.errors=error.error.errors
        }
      });;
    }
  }

  validate(): boolean {
    if (!this.product.name || this.product.name.length <= 0) {
      this.error.name = 'Name is required';
      return false;
    } else {
      this.error.name = '';
    }

    return true;
  }
}
