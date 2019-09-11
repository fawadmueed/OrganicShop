import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { Products } from '../model/product';
import 'rxjs/add/operator/switchMap';
import { ActivatedRoute } from '@angular/router';
import { ShopingCartService } from '../shoping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy{
  // Its always good practice to initialize array with Empty Arrays
  products;
  filteredProducts: Products[] = [];
  searched_category: string;
  items;
  cart;
  subscription: Subscription;
  

  constructor(
    private productService: ProductService, 
    private route: ActivatedRoute,
    private shoppingCart: ShopingCartService) { 
    
    productService.getAll()
    .switchMap( prod => {
      this.products = prod ; 
      console.log(this.products);
      return route.queryParamMap;
    })
    .subscribe(params => {
        //Getting parameter 
        this.searched_category = params.get('category');
        this.filteredProducts= (this.searched_category) ?
                               this.products.filter( p=> p.category === this.searched_category)
                               : this.products;
        });


      // if productService.$key=item[0,1,2,3,4..].$key
      // item[0,1,2,3,4].quantity 

  }

  async ngOnInit(){
    this.subscription = (await this.shoppingCart.getCart()).subscribe(cart => this.cart = cart);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  

}
