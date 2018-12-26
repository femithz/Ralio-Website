import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  // tslint:disable-next-line:semicolon
  })

  constructor(private _router: Router, private _adminservice: AdminService) { }

  ngOnInit() {
  }
//  function for login
login() {
  if (!this.loginForm.valid) {
  console.log('Credential is not correct'); return;
  }
 this._adminservice.login(JSON.stringify(this.loginForm.value))
 .subscribe(
   data => {
     console.log(data);
       this._router.navigate(['/dashboard']);
    },
 // tslint:disable-next-line:no-shadowed-variable
 err => this.errorHandler(err, 'Either of the two credential is wrong')
 );
 }
 private errorHandler(error, message) {
  console.log(message, 'Error', {duration: 2000});
}
}
