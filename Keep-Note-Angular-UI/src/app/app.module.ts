import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { AuthenticationService } from './services/authentication.service';
import { NotesService } from './services/notes.service';
import { RouterService } from './services/router.service';
import { CanActivateRouteGuard } from './can-activate-route.guard';
import { NoteTakerComponent } from './note-taker/note-taker.component';
import { ListViewComponent } from './list-view/list-view.component';
import { NoteViewComponent } from './note-view/note-view.component';
import { NoteComponent } from './note/note.component';
import { EditNoteViewComponent } from './edit-note-view/edit-note-view.component';
import {MatSelectModule} from '@angular/material/select';
import { EditNoteOpenerComponent } from './edit-note-opener/edit-note-opener.component';
import {MatDialogModule} from '@angular/material/dialog';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { CategoryComponent } from './category/category.component';
import { ReminderComponent } from './reminder/reminder.component';
import { ReminderService } from './services/reminder.service';
import { CategoryService } from './services/category.service';
import {MatSidenavModule} from '@angular/material/sidenav';
import { SidenavComponent } from './sidenav/sidenav.component';
import { CategoryDashboardComponent } from './category-dashboard/category-dashboard.component';
import { CategoryTakerComponent } from './category-taker/category-taker.component';
import { CategoryViewComponent } from './category-view/category-view.component';
import { CatComponent } from './cat/cat.component';
import { EditCategoryOpenerComponent } from './edit-category-opener/edit-category-opener.component';
import { EditCategoryViewComponent } from './edit-category-view/edit-category-view.component';
import { ReminderViewComponent } from './reminder-view/reminder-view.component';
import { ReminderTakerComponent } from './reminder-taker/reminder-taker.component';
import { EditReminderOpenerComponent } from './edit-reminder-opener/edit-reminder-opener.component';
import { EditReminderViewComponent } from './edit-reminder-view/edit-reminder-view.component';
import { ReminderDashboardComponent } from './reminder-dashboard/reminder-dashboard.component';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: '', component: LoginComponent
  },
  {
    path: 'dashboard', component: DashboardComponent,
    canActivate: [CanActivateRouteGuard],
    children: [
      {
        path: 'view/noteview',
        component: NoteViewComponent
      },
      {
        path: 'view/listview',
         component: ListViewComponent
      },
      {
        path: '',
        redirectTo: 'view/noteview',
        pathMatch: 'full'
      },
      {
        path: 'note/:noteId/edit',
         component: EditNoteOpenerComponent,
         outlet: 'noteEditOutlet'
      }
    ]
  },
  {
    path: 'category-dashboard', component: CategoryDashboardComponent,
    canActivate: [CanActivateRouteGuard],
    children: [
      {
        path: 'view/categoryview',
        component: CategoryViewComponent
      },
      {
        path: '',
        redirectTo: 'view/categoryview',
        pathMatch: 'full'
      },
      {
        path: 'cat/:id/edit',
         component: EditCategoryOpenerComponent,
         outlet: 'categoryEditOutlet'
      }
    ]
  },
  {
    path: 'reminder-dashboard', component: ReminderDashboardComponent,
    canActivate: [CanActivateRouteGuard],
    children: [
      {
        path: 'view/reminderview',
        component: ReminderViewComponent
      },
      {
        path: '',
        redirectTo: 'view/reminderview',
        pathMatch: 'full'
      },
      {
        path: 'reminder/:id/edit',
         component: EditReminderOpenerComponent,
         outlet: 'reminderEditOutlet'
      }
    ]
  },
  {
    path: 'registration',
    component: UserRegistrationComponent
  },
  {
    path: 'category',
    component: CategoryComponent
  },
  {
    path: 'reminder',
    component: ReminderComponent
  },

  ];

@NgModule({
  declarations: [AppComponent,
    HeaderComponent,
    LoginComponent,
    DashboardComponent,
    NoteTakerComponent,
    ListViewComponent,
    NoteViewComponent,
    NoteComponent,
    EditNoteViewComponent,
    EditNoteOpenerComponent,
    UserRegistrationComponent,
    CategoryComponent,
    ReminderComponent,
    SidenavComponent,
    CategoryDashboardComponent,
    CategoryTakerComponent,
    CategoryViewComponent,
    CatComponent,
    EditCategoryOpenerComponent,
    EditCategoryViewComponent,
    ReminderViewComponent,
    ReminderTakerComponent,
    EditReminderOpenerComponent,
    EditReminderViewComponent,
    ReminderDashboardComponent],
  imports: [BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatExpansionModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    MatSelectModule,
    MatDialogModule,
    MatSidenavModule],
  providers: [AuthenticationService,
    NotesService,
    RouterService,
    CanActivateRouteGuard,
    ReminderService,
    CategoryService ],
  bootstrap: [AppComponent],
  entryComponents: [EditNoteViewComponent, EditCategoryViewComponent, EditReminderViewComponent]
})



export class AppModule { }
