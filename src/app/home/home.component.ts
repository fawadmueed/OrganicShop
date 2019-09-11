import { Component, OnInit } from '@angular/core';
import { stringify } from '@angular/core/src/render3/util';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { CategoryService } from '../category.service';
import { ProductService } from '../product.service';
import { Products } from '../model/product';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements CanActivate {

  categories$;
  // Its always good practice to initialize array with Empty Arrays
  products;
  filteredProducts: Products[] = [];
  searched_category;

  constructor(private categorySrvc: CategoryService, private productService: ProductService, private route: ActivatedRoute) 
  { 
  }


canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot){
  
  return true;
  
}
 
}
