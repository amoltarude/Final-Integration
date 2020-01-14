import { Component, OnInit } from '@angular/core';
import { Reminder } from '../reminder';
import { ReminderService } from '../services/reminder.service';

@Component({
  selector: 'app-reminder-view',
  templateUrl: './reminder-view.component.html',
  styleUrls: ['./reminder-view.component.css']
})
export class ReminderViewComponent implements OnInit {
  reminders: Array<Reminder>;
  errMessage: string;

  constructor(private reminderservice: ReminderService) {
    this.reminders = [];
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    this.reminderservice.getReminders().subscribe(reminderData => {
      this.reminders = reminderData;
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
