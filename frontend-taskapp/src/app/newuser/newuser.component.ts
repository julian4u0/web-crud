import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DataService } from '../data.service';
import { User } from '../User';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.css'],
  providers: [DataService]
})
export class NewuserComponent implements OnInit {
  registerForm;
  loginForm;

  public registerError: any;
  public loginError: any;

  constructor(private formBuilder: FormBuilder, private dataService: DataService, private router: Router) {
    this.registerForm = this.formBuilder.group({
      email: '',
      password: ''
    })
    this.loginForm = this.formBuilder.group({
      email: '',
      password: ''
    })

  }
  ngOnInit(): void {
  }
  register(userData) {
    if (userData.email == "" || userData.password == "") {
      this.registerError = "Ingresa todo los campos";

    }
    else {
      this.dataService.registerUser(userData as User)
        .subscribe(response => {

          if (response.success) {
            localStorage.setItem('uid', response.data);
            this.router.navigate(['/tasks-dashboard']);
          }
          else {
            this.registerError = response.data;

          }
        })

    }

  }

  login(userData) {

    if (userData.email == "" || userData.password == "") {
      this.loginError = "Ingresa todo los campos";

    }
    else {
      this.dataService.loginUser(userData as User)
        .subscribe(response => {
          if (response.success) {
            localStorage.setItem('uid', response.data);
            this.router.navigate(['/tasks-dashboard']);
          }
          else {
            this.loginError = response.data;
          }
        })
    }

  }

}
