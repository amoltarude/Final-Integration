import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    username: FormControl;
    password: FormControl;
    // loginForm = new FormGroup({

    submitMessage: string;
    constructor(private authservice: AuthenticationService, private routerservice: RouterService) {
      this.username = new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)]));
      this.password = new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)]));
    }

    loginSubmit() {
      console.log(this.username.value);
      console.log(this.password.value);
      const userData = {userId: this.username.value,
        userPassword: this.password.value,
        firstName: '',
        lastName: '',
        userRole: '',
        userAddedDate: ''
       };
       this.authservice.setUserData(userData);

      this.authservice.authenticateUser(userData).subscribe(
        data => {
          console.log(data);
          this.authservice.setBearerToken(data['Token']);
          this.authservice.setUserID(this.username.value);
          console.log('*************');

          this.routerservice.routeToDashboard();
          console.log('*************');
        },
        err => {
          console.log('*************');
          console.log('*************');
          this.submitMessage = err.message;
          console.log(err);
          this.routerservice.routeToDashboard();


        }
      );
    }
}
