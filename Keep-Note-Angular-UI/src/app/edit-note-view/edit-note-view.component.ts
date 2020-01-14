import { Component, Inject, OnInit } from '@angular/core';
import { Note } from '../note';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotesService } from '../services/notes.service';
import { Reminder } from '../reminder';
import { Category } from '../category';
import { CategoryService } from '../services/category.service';
import { ReminderService } from '../services/reminder.service';
import { FormControl } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-edit-note-view',
  templateUrl: './edit-note-view.component.html',
  styleUrls: ['./edit-note-view.component.css']
})
export class EditNoteViewComponent implements OnInit {
  note: Note;
  status: Array<string> = ['not-started', 'started', 'completed'];
  errMessage: string;
  reminders: Array<Reminder>;
  categorys: Array<Category>;
  selectedReminder: string;
  toppings = new FormControl();
  reminder: Array<Reminder>;
  testreminder = ['asas', 'xzx'];

  constructor(private dialogRef: MatDialogRef<EditNoteViewComponent>,
    @Inject(MAT_DIALOG_DATA)private data: any, private noteservice: NotesService, private authservice: AuthenticationService,
    private categoryservice: CategoryService, private reminderservice: ReminderService) {
      this.note = new Note();
      this.reminders = [];
      this.categorys = [];
      this.reminder = [];
      this.getReminderCategoryData();
  }

  ngOnInit() {
    this.noteservice.getNoteById(this.data.noteId).subscribe(
      data => {
        this.note = data;
        console.log(data);
      },
      err => {
        if (err.status === 403) {
          this.errMessage = err.message;
        } else {
          this.errMessage = err.message;
        }
      });
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

  onSave() {
    console.log('*************');
    console.log(this.reminder);
    console.log(this.note);
    this.noteservice.editNote(this.note).subscribe((data) => {
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
    this.noteservice.deleteNote(this.note).subscribe((data) => {
      this.dialogRef.close();
      this.noteservice.fetchNotesFromServer();
      this.noteservice.notesSubject.next(this.noteservice.notes);
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
