import { Component } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';
import { Reminder } from '../reminder';
import { Category } from '../category';

@Component({
  selector: 'app-note-view',
  templateUrl: './note-view.component.html',
  styleUrls: ['./note-view.component.css']
})
export class NoteViewComponent {
  notes: Array<Note>;
  reminders: Array<Reminder>;
  categorys: Array<Category>;
  errMessage: string;

  constructor(private noteservice: NotesService) {
    // this.notes = [];
    // this.reminders = [];
    // this.categorys = [];
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    this.noteservice.getNotes().subscribe(noteData => {
      this.notes = noteData;
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
