import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../product.service';
import { Subscription } from 'rxjs/Subscription';
import { Products } from '../../model/product';
import { DataTableResource } from 'angular5-data-table';

// import { DataTableModule } from 'angular-4-data-table';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  products : Products[];
  subscription: Subscription;
  filteredProducts: any[];
  tableResource: DataTableResource<Products>;
  myProd;

  constructor(public productService: ProductService) {

    this.subscription = this.productService.getAll()
    .subscribe(prod => this.filteredProducts = this.products = prod );
    console.log('Product Service Subscription ');
    console.log(this.subscription);
  }

  
  filter(query: string){
    //Received string from Input
    console.log(this.filteredProducts);
    this.filteredProducts = ( query ) ? 
    this.products.filter(p => p.title.includes(query)) : 
    //this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) : 
    this.products;
   
  }
  myFilter(query: string){
    var prod=['mazda','suzuki','mercedes','nissa','honda'];
    if(query)
    {
      this.myProd=prod;
      this.myProd = prod.filter(p => p.includes(query) );
      console.log(this.myProd);
    }
    else{
      console.log('not found');
    }

  }

  ngOnInit() {
  }

  ngOnDestroy(){

    this.subscription.unsubscribe();
  }

}
