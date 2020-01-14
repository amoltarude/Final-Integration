import { Injectable } from '@angular/core';
import { Note } from '../note';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AuthenticationService } from './authentication.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

@Injectable()
export class NotesService {

  notes: Array<Note>;
  // notesSubject: BehaviorSubject<Array<Note>>;
  notesSubject: BehaviorSubject<Array<Note>> = new BehaviorSubject(this.notes);

  constructor(private authservice: AuthenticationService, private httpClient: HttpClient) {
   // this.notes = [];
    this.notesSubject = new BehaviorSubject(this.notes);
    this.fetchNotesFromServer();
   }

  fetchNotesFromServer() {
    const formattedUrl = 'http://localhost:8082/api/v1/note' + '/' + this.authservice.getUserID();
    console.log(formattedUrl);
    return this.httpClient.get<Note[]>(formattedUrl, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authservice.getBearerToken()}`)
    }).subscribe(data => {
      this.notes = data;
      this.notesSubject.next(this.notes);
    },
    error => {
      if (error.status === 404) {
        console.log(error);
      } else {
      console.log(error);
      }});
  }

   getNotes(): Observable<Array<Note>> {
    return this.notesSubject;
  }

  addNote(note: Note): Observable<Note> {
    return this.httpClient.post<Note>('http://localhost:8082/api/v1/note', note, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${ this.authservice.getBearerToken()}`)
    }).do(newnote => {
      this.fetchNotesFromServer();
        this.notesSubject.next(this.notes);
    }, error => {
      if (error.status === 404) {
        console.log(error);
      } else {
      console.log(error);
      }});
  }

  editNote(note: Note): Observable<Note> {
     return this.httpClient.put<Note>(`http://localhost:8082/api/v1/note/${this.authservice.getUserID()}/${note.noteId}`, note, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${ this.authservice.getBearerToken()}`)
     }).do(ediNote => {
      this.fetchNotesFromServer();
        this.notesSubject.next(this.notes);
  });
  }


  getNoteById(noteId): Observable<Note> {
    const formattedUrl = 'http://localhost:8082/api/v1/note' + '/'
     + this.authservice.getUserID() + '/' + noteId;
     const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authservice.getBearerToken()}`);

     return this.httpClient.get<Note>(formattedUrl, {
      headers : headers
    });

  }

  deleteNote(note: Note) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authservice.getBearerToken()}`);

    return this.httpClient.delete(`http://localhost:8082/api/v1/note/${this.authservice.getUserID()}/${note.noteId}`, {
      headers : headers
  }).do(() => {
      this.fetchNotesFromServer();
        this.notesSubject.next(this.notes);
  }, error => {
    console.log('deleteNote');
    if (error.status === 404) {
      console.log(error);
    } else if (error.status === 201 || error.status === 200) {
      this.fetchNotesFromServer();
      this.notesSubject.next(this.notes);
    } else {
      console.log(error);
    }});
  }
}
