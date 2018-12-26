import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  constructor(private _router: Router, private _adminService: AdminService) { }

  ngOnInit() {
    this._adminService.dashboard().subscribe(data => {
      console.log(data);
  });
  }
  logout() {
    this._adminService.logout()
    .subscribe(
      data => {
        this._router.navigate(['/login']);
    },
      error => console.error(error)
    );
  }
}
