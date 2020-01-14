import { Component } from '@angular/core';
import { RouterService } from '../services/router.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import {MatSidenavModule} from '@angular/material/sidenav';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isNoteView = false;
  options: FormGroup;
  opened: boolean;
  constructor(private routerservice: RouterService, fb: FormBuilder, private authservice: AuthenticationService) {
    this.isNoteView = true;
    this.opened = false;
     this.options = fb.group({
      bottom: 0,
      fixed: true,
      top: 60
    });
  }

  test() {
    this.isNoteView = !this.isNoteView;
    if (this.isNoteView) {
      this.routerservice.routeToNoteView();
    } else {
      this.routerservice.routeToListView();
    }
  }

  logout() {
    this.authservice.setBearerToken('');
    this.authservice.setUserID('');
    this.routerservice.routeToLogin();
  }
}
