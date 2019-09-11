import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../category.service';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../product.service';
import { CustomFormsModule } from 'ng2-validation';
import { Router, ActivatedRoute } from '@angular/router';
// import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  formdata;
  product= {} ;
  id;

  constructor(
    private activated_route: ActivatedRoute,
    private router: Router,
    private catergoryService: CategoryService,
    private prod_service:ProductService ) 
    {

      this.id = this.activated_route.snapshot.paramMap.get('id');
      //Getting id from URL

      if(this.id) 
      // If there's ID
        {
          //Get this product with this ID from Product Service
          this.prod_service.getProduct(this.id).subscribe(p =>
            {
              this.product = p;
              console.log(this.product);
            });
        }
      //we subscribed but didnt unsubscribe , Sol : Ondestroy OR take operator from rxjs


    this.categories$ = catergoryService.getCategories();
    this.categories$.subscribe(x=> console.log(x));
   }

  ngOnInit() {
  }

  save(formD)
  {
    // this.formdata=formD;
    if(this.id)
    {
      this.prod_service.update(this.id,this.product);
    }
    else
    {
      this.prod_service.create(formD);
    }
    
    this.router.navigate(['/admin/products']);
  
    // this.formdata=formD;
  }

  delete(){
    if(confirm("Are you sure you want to delete"))
    {
      this.prod_service.delete(this.id);
      this.router.navigate(['/admin/products']);
    }
    else
    {
      return ;
    }

  }



}
