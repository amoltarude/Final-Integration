import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../services/category.service';
import { Category } from '../category';

@Component({
  selector: 'app-edit-category-view',
  templateUrl: './edit-category-view.component.html',
  styleUrls: ['./edit-category-view.component.css']
})
export class EditCategoryViewComponent implements OnInit {
  category: Category;
  states: Array<string> = ['not-started', 'started', 'completed'];
  errMessage: string;
  categoryList;

  constructor(private dialogRef: MatDialogRef<EditCategoryViewComponent>,
    @Inject(MAT_DIALOG_DATA)private data: any, private categoryservice: CategoryService) {
      this.category = new Category();
      console.log(data);
      this.categoryservice.getCategoryById(this.data.id).subscribe(response => {
        console.log('+++++++++++++++++++++++');
        console.log(response);
        this.category.id = response['id'];
        this.category.categoryCreatedBy = response['categoryCreatedBy'];
        this.category.categoryCreationDate = response['categoryCreationDate'];
        this.category.categoryDescription = response['categoryDescription'];
        this.category.categoryName = response['categoryName'];
        // this.category = response;
      },
      error => {
        console.log(error);
      });
  }

  ngOnInit() {
    this.categoryservice.getCategoryById(this.data.id).subscribe(response => {
      console.log('+++++++++++++++++++++++');
      console.log(response);
      // this.category = response;
    });
  }

  onSave() {
    this.categoryservice.updateCategory(this.category).subscribe((data) => {
      this.categoryservice.getAllCategoryByUserId();
      this.categoryservice.categorySubject.next(this.categoryservice.categorys);
      this.dialogRef.close();
    },
    err => {
      if (err.status === 403) {
        this.errMessage = err.message;
      } else {
        this.errMessage = err.message;
      }
    });
  }

  onDelete() {
    this.categoryservice.deleteCategory(this.category.id).subscribe((data) => {
      this.dialogRef.close();
    },
    error => {
      if (error.status === 404) {
        console.log(error);
      } else if (error.status === 200 || error.status === 201) {
        this.dialogRef.close();
      } else {
        console.log(error);
      }});
    }

}
