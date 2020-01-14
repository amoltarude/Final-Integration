import { Component, OnInit } from '@angular/core';
import { Category } from '../category';
import { CategoryService } from '../services/category.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-category-taker',
  templateUrl: './category-taker.component.html',
  styleUrls: ['./category-taker.component.css']
})
export class CategoryTakerComponent implements OnInit {

  category: Category;
  categorys: Category[];
  errMessage: string;

  constructor(private categoryservice: CategoryService, private authservice: AuthenticationService) {
    this.category = new Category();
    this.category.categoryCreatedBy = authservice.getUserID();
    this.categorys = [];
  }

  ngOnInit() {
  }


  addCategory() {
     if (this.category.categoryName === undefined || this.category.categoryDescription === undefined ||
      this.category.categoryName === '' || this.category.categoryDescription === '') {
      this.errMessage = 'Title and Text both are required fields';
    }else {
      // this.categorys.push(this.category);
       delete this.category.id;
      console.log(this.category);
      this.category.categoryCreatedBy = this.authservice.getUserID();
      console.log(this.category);
      this.categoryservice.createCategory(this.category).subscribe(data => {
        console.log(data);
        this.categoryservice.getAllCategoryByUserId();
      },
        err => {
          if (err.status === 404) {
            this.errMessage = err.message;
          } else {
            this.errMessage = err.errorMessage;
          }
           });
      this.category = new Category();
    }
  }

}
