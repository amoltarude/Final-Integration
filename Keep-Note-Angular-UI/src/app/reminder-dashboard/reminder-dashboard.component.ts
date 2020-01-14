import { Component, OnInit } from '@angular/core';
import { ReminderService } from '../services/reminder.service';

@Component({
  selector: 'app-reminder-dashboard',
  templateUrl: './reminder-dashboard.component.html',
  styleUrls: ['./reminder-dashboard.component.css']
})
export class ReminderDashboardComponent implements OnInit {

  constructor(private reminderservice: ReminderService) {
    this.reminderservice.getAllReminders();
  }
  ngOnInit() {
  }

}
