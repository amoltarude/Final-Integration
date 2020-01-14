import { Category } from './category';
import { Reminder } from './reminder';

export class Note {
  category: Category;
  noteContent: string;
  noteCreatedBy: string;
  noteCreationDate: string;
  noteId: Number;
  noteStatus: string;
  noteTitle: string;
  reminders: Array<Reminder>;

  constructor() {
    this.category = new Category();
    this.noteContent = '';
    this.noteCreatedBy = '';
    this.noteCreationDate = '';
    this.noteId = 0;
    this.noteStatus = 'not-started';
    this.noteTitle = '';
    this.reminders = [];
  }
}
