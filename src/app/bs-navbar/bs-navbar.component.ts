import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable, iif } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ShopingCartService } from '../shoping-cart.service';
import { AdminAuthGuardService } from '../services/canActivate/admin-auth-guard.service';
import { isDate } from 'util';
import { ShoppingCart } from '../model/shopping-cart';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit{

  cart$: Observable<ShoppingCart>;
  isAdmin;

  constructor(public auth: AuthService,private cartService:ShopingCartService, adminGuard: AdminAuthGuardService) {
    // auth is public because we use auth.user variable in template
    // in production compiler expect it to be public
    //  this.cartService.totalItemsInCart().subscribe(res => this.shoppingCartNumber = res.length);
     adminGuard.canActivate().subscribe(val => {
       this.isAdmin = val ; 
     });
   }

  logout()
  {
    this.auth.logout();
  }

  async ngOnInit(){
    this.cart$ = await this.cartService.getCart();
    this.cart$.subscribe(x => console.log(x));
    
  }


}