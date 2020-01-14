import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from './../services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  errorMessage = '';
  categoryForm: FormGroup;
  categoryList;
  categoryEditId = '';

  constructor(private fb: FormBuilder, private categoryService: CategoryService) { }

  ngOnInit() {
    this.getAllCategoryByUserId();
  }

  getAllCategoryByUserId() {

    this.categoryForm = this.fb.group({
      categoryName: ['', Validators.required],
      categoryDescription: ['', Validators.required]
    });
    this.categoryForm.markAsUntouched();
    this.categoryForm.markAsPristine();
    this.categoryEditId = '';

    // this.categoryService.getAllCategoryByUserId().subscribe(response => {
    //   if (response) {
    //     this.categoryList = response;
    //   } else {
    //     this.categoryList = [];
    //     this.errorMessage = response['errorMessage'];
    //   }
    // }, error => {
    //   this.categoryList = [];
    //   this.errorMessage = error.errorMessage;
    // });
  }

  createCategory(categoryForm) {
    console.log('createCategory');
    if (categoryForm && categoryForm.valid) {
      const requestParams = categoryForm.value.categoryName;
      const category = {
        categoryName: categoryForm.value.categoryName,
        categoryCreatedBy : sessionStorage.getItem('userId'),
        categoryDescription: categoryForm.value.categoryDescription,
        categoryCreationDate: ''
      };
      this.errorMessage = '';
      console.log(category);
      this.categoryService.createCategory(category).subscribe(response => {
        if (response && response['status'] === 'Success') {
          this.getAllCategoryByUserId();

        } else {
            this.errorMessage = response['errorMessage'];
        }
      }, error => {
        this.getAllCategoryByUserId();
        this.errorMessage = error.errorMessage;
      });
    }
  }

  deleteCategory(category) {
    this.categoryService.deleteCategory(category.id).subscribe(response => {
      if (response && response['status'] === 'Success') {
          this.categoryList = response['categories'];
      } else {
        this.errorMessage = response['errorMessage'];
      }
    }, error => {
      this.errorMessage = error.errorMessage;
    });
  }

  editCategory(category) {
    this.categoryEditId = category.id;
console.log(category);
    this.categoryForm = this.fb.group({
      categoryName: [category.categoryName, Validators.required],
      categoryDescription: [category.categoryDescription, Validators.required]
    });
  }

  updateCategory(categoryForm) {
    if (categoryForm && categoryForm.valid) {
      const requestParams = categoryForm.value;
      this.errorMessage = '';

      // this.categoryService.updateCategory(requestParams, this.categoryEditId).subscribe(response => {
      //   if (response && response['status'] === 'Success') {
      //     this.categoryList = response['categories'];
      //   } else {
      //     this.errorMessage = response['errorMessage'];

      //   }
      // }, error => {
      //   this.errorMessage = error.errorMessage;
      // });
    }
  }
}
