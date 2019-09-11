import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { timestamp } from 'rxjs/operators';
import { createAotCompiler } from '@angular/compiler';
import { Products } from './model/product';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { ShoppingCart } from './model/shopping-cart';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopingCartService {

  cartId: String;

  constructor(private db:AngularFireDatabase) { 
  }

   async getCart():Promise<Observable<ShoppingCart>>
  {
    let cartId = await this.getOrCreateCartId();
    //Getting Object of Shopping Cart & Mapping it to model ShoppingCart
    return this.db.object('/shopping-carts/'+cartId)
    .map(x => new ShoppingCart(x.items));
  }

  async getAllItems()
  {
    let cartId = await this.getOrCreateCartId();
    let items= this.db.object('/shopping-carts/' + cartId + '/items/');
    console.log(items);
    return items;
  }

  private create()
  {
    //returns ThenableReference
    return this.db.list('/shopping-carts').push({
      dateCreated :new Date().getTime() 
    });
  }

  getItem(cartId: string, product : Products){
    let item= this.db.object('/shopping-carts/' + cartId + '/items/' + product.$key);
    return item;
  }

  //As we decorate it with Asynch for (await) this method will return a Promise
  private async getOrCreateCartId(): Promise<string>
  {
    let cartId = localStorage.getItem('cartId');
    if(cartId) return cartId;
      // In TypeScript if we have Async Method that returns promise
      // & if we want to call it like Synch method,simple apply 'await' operator & decorate method 'async'
      
      // this.create().then(result => {
      // localStorage.setItem('cartId',result.key);
      // return this.getCart(result.key);
      // })
      //Below code is like else 
    let result = await this.create();
    console.log(result);
    //retult is the reference of the create cart , You can access result.key , result.path ...etc 
    localStorage.setItem('cartId',result.key);
    return result.key;
  }

  async addToCart(product: Products)
  { 
    let cartId = await this.getOrCreateCartId();
    //can use : cart.then  or use await function
    // this.createCart();

    //Following gives us the Observable. As we dont need to subscribe or unsubscrbe we will use take operator
    //!Important - If not Used take(1) it will keep performing update or set operation infinite times
    //We took the reference so we can see it exists ? Also we can see quantity
    
    // let item$ = this.db.object('/shopping-carts/' + cartId + '/items/' + product.$key);
    // item$.take(1).subscribe(item => {
    //   console.log(item);
    //   if (item.$exists()) item$.update({quantity: item.quantity + 1});
    //   else item$.set({product: product, quantity:1});
    // })
    console.log(product);
    let item$=this.getItem(cartId,product);
    item$.take(1).subscribe(item =>{
      console.log(item);
      item$.update({product: product, quantity: (item.quantity || 0 ) + 1});
    
      });
    }

  totalItemsInCart(){
    let cartId = localStorage.getItem('cartId');
    return this.db.list('/shopping-carts/' + cartId + '/items/');
  }

  async allItems()
  {
    let cartId = await this.getOrCreateCartId();
    console.log(cartId);
    return this.db.list('/shopping-carts/' + cartId + '/items/');
  }

  async deleteFromCart(product)
  {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId,product);
    item$.take(1).subscribe(item => {
    
      item$.update({product: product, quantity: (item.quantity || 0 ) - 1});
      // console.log(item.quantity);
    })

    // if(item.quantity>1)
    // {

    // }
  }

}