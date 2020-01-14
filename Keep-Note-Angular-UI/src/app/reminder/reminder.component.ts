import { Component, Input, OnInit } from '@angular/core';
import { RouterService } from '../services/router.service';
import { Reminder } from '../reminder';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.css']
})
export class ReminderComponent implements OnInit {
  constructor(private routerservice: RouterService) {

  }
  @Input()
  reminder: Reminder;
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {

  }

  editReminder() {
    const id = this.reminder.reminderId;
    console.log(this.reminder);
    this.routerservice.routeToEditReminderView(id);
  }

}
