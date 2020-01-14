import { Component, OnInit } from '@angular/core';
import { Category } from '../category';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.css']
})
export class CategoryViewComponent implements OnInit {
  categorys: Array<Category>;
  errMessage: string;

  constructor(private categoryservice: CategoryService) {
    this.categorys = [];
  }

  ngOnInit() {
    this.categoryservice.getCategorys().subscribe(data => {
      this.categorys = data;
    }
    ,
    err => {
      if (err.status === 403) {
        this.errMessage = err.error.message;
      } else {
         this.errMessage = err.message;
      }
    }
    );
  }
}
