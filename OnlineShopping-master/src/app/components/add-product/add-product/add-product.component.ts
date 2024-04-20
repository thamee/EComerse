import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { MasterData } from 'src/app/models/master-data';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  selectedFile!: File;
  
  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { 
    const role = authService.getUserRole();
  }

  categories: MasterData[] = [];
  form = new Product();
  errors: string[] = [];
  error = {
    name: '',
    category: '',
    color: '',
    model: '',
    price: '',
  };  

  ngOnInit(): void {
    this.productService.getProductCategories().subscribe((categories: MasterData[]) => {
      this.categories = categories;
    });
  }
  onFileSelected(event: any) {
    debugger
    this.selectedFile = event.target.files[0] as File;
  }
  formSubmit() {
    if (this.validate()) {
      var product = new Product()
      debugger
        product.name = this.form.name;
        product.categoryId =this.form.category
        product.description = this.form.description;
        product.price = this.form.price
        product.image = this.form.image;
      
      this.productService.addProduct(product).subscribe((productId: any) => {
        this.toastr.success('!', 'Product Added Successfully!');
        this.productService.uploadProductImage(productId, this.selectedFile).subscribe(() => {
          this.toastr.success('!', 'Product Image Uploaded Successfully!');
        }, (error: any) => {
          this.toastr.error('!', 'Product Image Upload Failed!');
          if (error && error.error && error.error.errors) {
            this.errors = error.error.errors;
          }
        });
        this.reset();
      }, (error: any) => {
        this.toastr.error('!', 'Product Added Failed!');
        if (error && error.error && error.error.errors) {
          this.errors = error.error.errors;
        }
      });
    }
  }
  reset() {
    this.form = new Product();
  }

  validate(): boolean {
    /* Validate name */
    if (!this.form.name || this.form.name.length <= 0) {
      this.error.name = "Name is required";
      return false;
    } else {
      this.error.name = '';
    }

    /* Validate category */
    if (!this.form.category) {
      this.error.category = "Please select a Category";
      return false;
    } else {
      this.error.category = '';
    }

   

    /* Validate price */
    if (!this.form.price || this.form.price <= 0) {
      this.error.price = "Price should be greater than 0";
      return false;
    } else {
      this.error.price = '';
    }

    return true;
  }
}
