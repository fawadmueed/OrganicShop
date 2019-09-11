import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {

    constructor(public items: ShoppingCartItem[]){
    }

    get productIds(){
        return Object.keys(this.items);
        
      }
    
    get totalItemsCount(){
        let count = 0; 
        // for(let key in object)
        for(let productId in this.items)
        { 
            //ProductId just used to get the KEY of the cart.item 
            count += this.items[productId].quantity;
        }
        return count;
    }
}