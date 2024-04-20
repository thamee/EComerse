import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent implements OnInit {

  constructor(private productService: ProductService,private router: Router,authService:AuthService) { 
    const role=authService.getUserRole();
    // if(role!="Sellers"){
    //   this.router.navigateByUrl(`/`);

    // }
  }

  products!: Product[];
  productLables!:string[]
  pagedProducts: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10; // C

  ngOnInit(): void {
    this.productLables=["Name","category","image","price","",""];
    this.getProducts();
    this.setPage(1); // Initial page

   
  }
  getProducts(){
    this.productService.getAllProducts("0",this.currentPage.toString()).subscribe((products:Product[]) => {
      this.products=products;
     
  });
  }
  setPage(page: number) {
    this.currentPage = page;
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage - 1, this.products.length - 1);
    this.pagedProducts = this.products.slice(startIndex, endIndex + 1);
  }

  nextPage() {
    if (this.currentPage < Math.ceil(this.products.length / this.itemsPerPage)) {
      this.setPage(this.currentPage + 1);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.setPage(this.currentPage - 1);
    }
  }
  editProduct(id:number){
    this.router.navigateByUrl(`edit-product/${id}`);
  }
  deleteProduct(id:any){
    this.productService.deleteProduct(id).subscribe(() => {
    this.getProducts()
     
  });
  }

}
