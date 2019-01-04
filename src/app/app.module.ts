import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { ProductsComponent } from './products/products.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { HomeComponent } from './home/home.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';
import { AdminAuthGuardService } from './admin-auth-guard.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { CategoryService } from './category.service';
import { UserService } from './user.service';
import { ProductService } from './product.service';
import {CustomFormsModule} from 'ng2-validation';


@NgModule({
  declarations: [
    
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    OrderSuccessComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductFormComponent
  ],
  imports: [
    CustomFormsModule,
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([ 
      {path: '' , component:HomeComponent },
      {path: 'products' , component: ProductsComponent },
      {path: 'shopping-cart' , component: ShoppingCartComponent },
      {path: 'check-out' , component:CheckOutComponent , canActivate: [AuthGuardService]},
      {path: 'order-success' , component:OrderSuccessComponent ,canActivate: [AuthGuardService]},
      {path: 'login' , component:LoginComponent },
      {path: 'admin/products/new' , component: ProductFormComponent ,canActivate: [AuthGuardService,AdminAuthGuardService]},
      {path: 'admin/products/:id' , component: ProductFormComponent ,canActivate: [AuthGuardService,AdminAuthGuardService]},
      {path: 'admin/products' , component: AdminProductsComponent ,canActivate: [AuthGuardService,AdminAuthGuardService]},
      {path: 'admin/login' , component:AdminOrdersComponent ,canActivate: [AuthGuardService,AdminAuthGuardService]},
      {path: 'admin/orders' , component:AdminProductsComponent,canActivate: [AuthGuardService,AdminAuthGuardService] }

    ]) 
  ],

  providers: [
    AuthService,
    AuthGuardService,
    AdminAuthGuardService,
    UserService,
    CategoryService,
    ProductService
],
  bootstrap: [AppComponent]
})
export class AppModule { }
