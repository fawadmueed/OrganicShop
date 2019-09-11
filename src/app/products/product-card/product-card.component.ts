import { Component, OnInit, Input } from '@angular/core';
import { a } from '@angular/core/src/render3';
import { ShopingCartService } from 'src/app/shoping-cart.service';
import { ShoppingCartComponent } from 'src/app/shopping-cart/shopping-cart.component';


@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent  {

  @Input() product; 
  @Input() showActionButton; 
  @Input() quantity; 
  @Input() shoppingCart;
  constructor(private cartService: ShopingCartService) { }

addToCart(product){
    // this.cartService.getOrCreateCart();
    this.cartService.addToCart(product);
}

 getQuantity(){
   //First finding if Shooping cart exist
  if (!this.shoppingCart) return 0;
  //Find if item with this Key exist
  let item = this.shoppingCart.items[this.product.$key];
  //If yes, Return item.quantity ( there are Item.product , and item.quantity)
  return item ? item.quantity : 0;
 }

 deleteFromCart(product)
 {
   this.cartService.deleteFromCart(product);
 }

}
