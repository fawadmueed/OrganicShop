import { Component, OnInit } from '@angular/core';
import { AdminCategoriesService } from 'src/app/admin-categories.service';


@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.css']
})
export class AdminCategoriesComponent implements OnInit {

  categories;
  category_key;
  category_name;

  constructor(private catgry_service:AdminCategoriesService) { 
  }

  ngOnInit() {
    this.catgry_service.getAll().subscribe((c)=>{
      this.categories = c ;
      console.log(c);
    });
  }

  create(category){
    if(!this.category_key)
    {//Create New
      console.log(category);
      this.catgry_service.create(category);
    }
    else
    {
      //Update Existing
      this.catgry_service.update(category);

    }
  }

  edit_product(prod){
    console.log(prod);
    this.category_key = prod.$key;
    this.category_name = prod.name;
  }

  delete_product(c){
    this.catgry_service.delete(c);
  }

  // get(){

  // }


}
