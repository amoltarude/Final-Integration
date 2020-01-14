import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-category-dashboard',
  templateUrl: './category-dashboard.component.html',
  styleUrls: ['./category-dashboard.component.css']
})
export class CategoryDashboardComponent implements OnInit {

  constructor(private categoryservice: CategoryService) {
    this.categoryservice.getAllCategoryByUserId();
  }
  ngOnInit() {
  }

}
