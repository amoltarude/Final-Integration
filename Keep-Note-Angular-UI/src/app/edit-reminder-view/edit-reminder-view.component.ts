import { Component, OnInit, Inject } from '@angular/core';
import { Reminder } from '../reminder';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReminderService } from '../services/reminder.service';

@Component({
  selector: 'app-edit-reminder-view',
  templateUrl: './edit-reminder-view.component.html',
  styleUrls: ['./edit-reminder-view.component.css']
})
export class EditReminderViewComponent implements OnInit {
  remider: Reminder;
  errMessage: string;
  categoryList;

  constructor(private dialogRef: MatDialogRef<EditReminderViewComponent>,
    @Inject(MAT_DIALOG_DATA)private data: any, private reminderservice: ReminderService) {
      this.remider = new Reminder();
      console.log(data);
      this.reminderservice.getRemindersById(this.data.id).subscribe(response => {
        console.log('+++++++++++++++++++++++');
        console.log(response);
        this.remider.reminderId = response['reminderId'];
        this.remider.reminderCreatedBy = response['reminderCreatedBy'];
        this.remider.reminderCreationDate = response['reminderCreationDate'];
        this.remider.reminderDescription = response['reminderDescription'];
        this.remider.reminderName = response['reminderName'];
        this.remider.reminderType = response['reminderType'];
        // this.category = response;
      },
      error => {
        console.log(error);
      });
  }

  ngOnInit() {
    this.reminderservice.getRemindersById(this.data.id).subscribe(response => {
      console.log('+++++++++++++++++++++++');
      console.log(response);
      // this.category = response;
    });
  }

  onSave() {
    this.reminderservice.updateReminder(this.remider).subscribe((data) => {
      this.reminderservice.getAllReminders();
      this.reminderservice.reminderSubject.next(this.reminderservice.reminders);
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
    this.reminderservice.deleteReminder(this.remider.reminderId).subscribe((data) => {
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
