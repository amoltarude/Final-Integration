import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthenticationService {

  private authURL: string;

  constructor(private httpclient: HttpClient) {
    this.authURL = 'http://localhost:3000/auth/v1';
  }

  authenticateUser(data) {
    console.log('authenticateUser');
    return this.httpclient.post('http://localhost:8089/api/v1/auth/login', data);
  }

  setBearerToken(token) {
    localStorage.setItem('bearerToken', token);
  }
  setUserID(userID) {
    localStorage.setItem('userID', userID);
  }

  getUserID() {
    return localStorage.getItem('userID');
  }

  setUserData(userID) {
    localStorage.setItem('userData', userID);
  }

  getUserData() {
    return localStorage.getItem('userData');
  }
  getBearerToken() {
    return localStorage.getItem('bearerToken');
  }

  isUserAuthenticated(data): Promise<boolean> {
    console.log(data);
    return new Promise((resolve, reject) => {

      this.httpclient.post('http://localhost:8089/api/v1/auth/login', data, {
        headers: {'Authorization': `Bearer ${this.getBearerToken()}`}
      }).subscribe(res => {
        resolve(true);
      },
      err => {
        reject(err);
      } );
    } );
  }
  registerUser(data) {
    return this.httpclient.post('http://localhost:8089/api/v1/auth/register', data);
  }
}
