import { Component, OnInit } from '@angular/core';
import { NotesService } from '../services/notes.service';
import { ReminderService } from '../services/reminder.service';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(private noteservice: NotesService, private reminderservice: ReminderService, private categoryservice: CategoryService) {
    this.noteservice.fetchNotesFromServer();
    this.categoryservice.getAllCategoryByUserId();
    this.reminderservice.getAllReminders();
  }


}
