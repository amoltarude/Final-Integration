import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Reminder } from '../reminder';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ReminderService {

  reminders: Array<Reminder>;
  // notesSubject: BehaviorSubject<Array<Note>>;
  reminderSubject: BehaviorSubject<Array<Reminder>> = new BehaviorSubject(this.reminders);
  getAllReminderUrl = 'http://localhost:8081/api/v1/reminder/user';
  constructor(private httpClient: HttpClient, private authService: AuthenticationService) {
    this.reminderSubject = new BehaviorSubject(this.reminders);
    this.getAllReminders();
  }

  getAllReminders() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`);
    const formattedUrl = this.getAllReminderUrl + '/' + this.authService.getUserID();
    return this.httpClient.get<Reminder[]>(formattedUrl, {
      headers : headers
    }).subscribe(data => {
      this.reminders = data;
      this.reminderSubject.next(this.reminders);
    },
    error => {
      if (error.status === 404) {
        console.log(error);
      } else {
      console.log(error);
      }});
  }

  getReminders(): Observable<Array<Reminder>> {
    return this.reminderSubject;
  }

  getRemindersById(reminderId) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`);

    return this.httpClient.get('http://localhost:8081/api/v1/reminder/' + reminderId, {
      headers : headers
    });
  }

  createReminder(requestParams) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`);

    return this.httpClient.post('http://localhost:8081/api/v1/reminder', requestParams, {
      headers : headers
    }).do(() => {
      console.log('ksahskahskahskahsk');
      this.getAllReminders();
      this.reminderSubject.next(this.reminders);
  }, error => {
    if (error.status === 404) {
      console.log(error);
    } else if (error.status === 201) {
      this.getAllReminders();
      this.reminderSubject.next(this.reminders);
    } else {
      console.log(error);
    }});
  }

  deleteReminder(reminderId) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`);

    return this.httpClient.delete('http://localhost:8081/api/v1/reminder/' + reminderId, {
      headers : headers
    }).do(ediNote => {
      this.reminders = this.reminders.filter(item => item.reminderId !== reminderId);
      this.reminderSubject.next(this.reminders);
  }, error => {
    console.log('deletereminder');
    if (error.status === 404) {
      console.log(error);
    } else if (error.status === 201 || error.status === 200) {
      this.getAllReminders();
      this.reminderSubject.next(this.reminders);
    } else {
      console.log(error);
    }});
  }

  updateReminder(requestParams) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`);

    return this.httpClient.put('http://localhost:8081/api/v1/reminder/' + requestParams.reminderId, requestParams, {
      headers : headers
    });
  }
}
