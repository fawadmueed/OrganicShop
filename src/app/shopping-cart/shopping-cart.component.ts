import { Component, OnInit } from '@angular/core';
import { ShopingCartService } from '../shoping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit{

  cart$;
  totalItems;
  items$;
  item;
  item2;

  constructor(private cart:ShopingCartService) { 
    
  
  }
  async ngOnInit(){
   this.cart$ = await this.cart.getCart();
    this.items$ = await this.cart.getAllItems();
    // this.item2 = Object.keys(this.items$);
    this.items$.subscribe(x=> { 
      this.item=x;
      this.item2= Object.keys(x); 
      console.log(this.item2);
    });
  }

  

}
