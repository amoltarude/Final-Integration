import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';
import { Reminder } from '../reminder';
import { Category } from '../category';
import { ReminderService } from '../services/reminder.service';
import { CategoryService } from '../services/category.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-note-taker',
  templateUrl: './note-taker.component.html',
  styleUrls: ['./note-taker.component.css']
})
export class NoteTakerComponent {
  note: Note;
  category: Category;
  reminder: Reminder;
  notes: Note[];
  reminders: Array<Reminder>;
  categorys: Array<Category>;
  errMessage: string;
  noteStatus: Array<String>;
  status: string;


  constructor(private noteservice: NotesService, private reminderservice: ReminderService,
     private categoryservice: CategoryService, private authService: AuthenticationService) {
    this.note = new Note();
    this.note.noteCreatedBy = this.authService.getUserID();
    this.noteStatus = ['not-started', 'started', 'completed'];
    this.notes = [];
    this.reminders = [];
    this.categorys = [];
    this.status = '';
    this.getReminderCategoryData();

  }

  getReminderCategoryData() {

    // remider data
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

    // category data
    this.categoryservice.getCategorys().subscribe(data => {
      this.categorys = data;
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
  takeNote() {
     if (this.note.noteContent === undefined || this.note.noteTitle === undefined ||
      this.note.noteContent === '' || this.note.noteTitle === '') {
      this.errMessage = 'Title and Text both are required fields';
    }else {
      // delete this.note.noteId;
      console.log(this.note);
      // this.notes.push(this.note);
      this.note.noteCreatedBy = this.authService.getUserID();
      this.noteservice.addNote(this.note).subscribe(data => {},
        err => {
          if (err.status === 404) {
            this.errMessage = err.message;
          } else {
            this.errMessage = err.errorMessage;
          }
           });
      this.note = new Note();
      this.reminder = new Reminder();
      this.status = '';
    }
  }
}
