import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Category } from '../category';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class CategoryService {

  categorys: Array<Category>;
  // notesSubject: BehaviorSubject<Array<Note>>;
  categorySubject: BehaviorSubject<Array<Category>> = new BehaviorSubject(this.categorys);
  getAllCategoryUrl = 'http://localhost:8083/api/v1/category';
  constructor(private httpClient: HttpClient, private authService: AuthenticationService) {
     this.categorySubject = new BehaviorSubject(this.categorys);
     this.getAllCategoryByUserId();
   }

  getAllCategoryByUserId() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`);
    const formattedUrl = this.getAllCategoryUrl + '/getByUserId/' + this.authService.getUserID();
    console.log(formattedUrl);
    return this.httpClient.get<Category[]>(formattedUrl, {
      headers : headers
    }).subscribe(data => {
      this.categorys = data;
      this.categorySubject.next(this.categorys);
    },
    error => {
      if (error.status === 404) {
        console.log(error);
      } else {
      console.log(error);
      }});
  }

  getCategorys(): Observable<Array<Category>> {
    return this.categorySubject;
  }
  getCategoryById(categoryId) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`);
    const formattedUrl = this.getAllCategoryUrl + '/' + categoryId;
    console.log(formattedUrl);
    return this.httpClient.get(formattedUrl, {
      headers : headers
    });
  }

  createCategory(requestParams) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`);

    return this.httpClient.post('http://localhost:8083/api/v1/category', requestParams, {
      headers : headers
    }).do(() => {
      console.log('ksahskahskahskahsk');
      this.getAllCategoryByUserId();
      this.categorySubject.next(this.categorys);
  }, error => {
    if (error.status === 404) {
      console.log(error);
    } else if (error.status === 201) {
      this.getAllCategoryByUserId();
      this.categorySubject.next(this.categorys);
    } else {
      console.log(error);
    }});
  }

  deleteCategory(categoryId) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`);

    return this.httpClient.delete('http://localhost:8083/api/v1/category/' + categoryId, {
      headers : headers
    }).do(ediNote => {
      this.categorys = this.categorys.filter(item => item.id !== categoryId);
      this.categorySubject.next(this.categorys);
  }, error => {
    console.log('deletecategory');
    if (error.status === 404) {
      console.log(error);
    } else if (error.status === 201 || error.status === 200) {
      this.getAllCategoryByUserId();
      this.categorySubject.next(this.categorys);
    } else {
      console.log(error);
    }});
  }

  updateCategory(requestParams) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`);

    return this.httpClient.put('http://localhost:8083/api/v1/category/' + requestParams.id, requestParams, {
      headers : headers
    });
  }
}
