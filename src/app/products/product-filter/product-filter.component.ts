import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from 'src/app/category.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  
  @Input ('category') searched_category;
  categories$;
  
  constructor(private categorySrvc: CategoryService) { 
    this.categories$ = categorySrvc.getCategories();
  }

  ngOnInit() {
  }

}
