import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterData } from 'src/app/models/master-data';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private productService: ProductService, private route: ActivatedRoute,private router: Router) { }
  products!: Product[];
  categories!: MasterData[];
  selectedCategoryId:number|null=null;
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const category = params['category'];
      this.productService.getAllProducts(category).subscribe((products: Product[]) => {
        this.products = products;
      });
    });
    this.productService.getProductCategories().subscribe((categories: MasterData[]) => {
      this.categories = categories;
    });
  }
  navigateToCategory(category: number): void {
    this.selectedCategoryId = category;
    this.router.navigate(['/'], { queryParams: { category: category } });
  }
  

}
