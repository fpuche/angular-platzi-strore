import { Component, inject, Input, signal, SimpleChanges } from '@angular/core';

import { ProductComponent } from '@products/components/product/product.component';
import { Product } from '@shared/models/product.model';
import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';
import { CategoryService } from '@shared/services/category.service';
import { category } from '@shared/models/category.module';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ProductComponent, RouterLinkWithHref],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export default class ListComponent {

  products = signal<Product[]>([]);
  categories = signal<category[]>([]);
  private cartService = inject(CartService);
  private producttService = inject(ProductService);
  private categorytService = inject(CategoryService);

  @Input() category_id? : string;


  ngOnInit() {
    this.geCategories();

  }

  ngOnChanges( changes:SimpleChanges ) {
    this.getProducts();
  }

  addToCart(product:Product){
    this.cartService.addToCart(product);
  }

  private getProducts(){
    this.producttService.getProducts(this.category_id)
    .subscribe({
      next:(products)=>{
        this.products.set(products);
      },
      error: ()=>{
      }
    })
  }

  private geCategories(){
    this.categorytService.getAll()
    .subscribe({
      next:(data)=>{
        this.categories.set(data);
      },
      error: ()=>{
      }
    })
  }

}
