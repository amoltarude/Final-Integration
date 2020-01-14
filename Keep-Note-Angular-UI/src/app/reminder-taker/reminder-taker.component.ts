import { Component, OnInit } from '@angular/core';
import { Reminder } from '../reminder';
import { ReminderService } from '../services/reminder.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-reminder-taker',
  templateUrl: './reminder-taker.component.html',
  styleUrls: ['./reminder-taker.component.css']
})
export class ReminderTakerComponent implements OnInit {

  reminder: Reminder;
  reminders: Reminder[];
  errMessage: string;

  constructor(private reminderservice: ReminderService, private authservice: AuthenticationService) {
    this.reminder = new Reminder();
    this.reminder.reminderCreatedBy = authservice.getUserID();
    this.reminders = [];
  }

  ngOnInit() {
  }


  addReminder() {
     if (this.reminder.reminderName === undefined || this.reminder.reminderDescription === undefined ||
      this.reminder.reminderName === '' || this.reminder.reminderDescription === '') {
      this.errMessage = 'Title and Text both are required fields';
    }else {
      this.reminders.push(this.reminder);
      delete this.reminder.reminderId;
      console.log(this.reminder);
      this.reminder.reminderCreatedBy = this.authservice.getUserID();
      this.reminderservice.createReminder(this.reminder).subscribe(data => {
        console.log(data);
        this.reminderservice.getAllReminders();
      },
        err => {
          if (err.status === 404) {
            this.errMessage = err.message;
          } else {
            this.errMessage = err.errorMessage;
          }
           });
      this.reminder = new Reminder();
    }
  }


}
