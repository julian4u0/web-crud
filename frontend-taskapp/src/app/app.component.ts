import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataService]
})
export class AppComponent {
  //title = 'Tareas app';
  constructor(private router: Router) {
  }
  ngOnInit(): void {
    if (localStorage.getItem('uid')) {
      this.router.navigate(['/tasks-dashboard']);
    }
    else {
      this.router.navigate(['/newuser']);
    }
  }

  getSession(): any {

  }
}
