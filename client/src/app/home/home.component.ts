import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from '../admin.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  galleryImage;
  messageForm: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.email, Validators.required]),
    message: new FormControl(null, Validators.required),
  });
  subcribeForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
  });
  constructor(private _router: Router, private _adminService: AdminService) {
    // this.getImage();
    this._adminService.getImage().subscribe(data => {
      this.galleryImage = data;
      console.log(this.galleryImage);
      },
       error => console.error(error)
       );
  }
  ngOnInit() {
    // this._adminService.getImage().subscribe(data => { console.log(data); }, error => console.error(error));
  }
  sendMessage() {
    if (!this.messageForm.valid) {
          console.log('Invalid Form'); return;
        }
        this._adminService.send(JSON.stringify(this.messageForm.value))
        .subscribe(
          data => {
            console.log(data, 'Book has been added successfully');
              this.messageForm.reset();
              this._router.navigate(['/']);
        },
        // tslint:disable-next-line:no-shadowed-variable
        error => console.error(error)
        );
  }
  subcribe() {
    if (!this.subcribeForm.valid) {
      console.log('Invalid Form'); return;
    } else {
      this._adminService.subcribe(JSON.stringify(this.subcribeForm.value))
      .subscribe(data => {
        console.log(data);
        this.subcribeForm.reset();
        this._router.navigate(['/home']);
      },
      error => console.error(error)
      );
    }
  }
  // getImage() {
    // this._adminService.getImage().subscribe(data => {
    //    this.galleryImage = data;
    //    console.log(this.galleryImage);
    //    },
    //     error => console.error(error)
    //     );
  //  }
}
