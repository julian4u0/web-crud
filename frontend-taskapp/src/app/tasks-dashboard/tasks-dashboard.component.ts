import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { Task } from '../Task';
//import { Router } from '@angular/router';
//import { Task } from '../Task';

@Component({
  selector: 'app-tasks-dashboard',
  templateUrl: './tasks-dashboard.component.html',
  styleUrls: ['./tasks-dashboard.component.css']
})

export class TasksDashboardComponent implements OnInit {

  addingError;
  date: Date;


  constructor(private router: Router, private dataService: DataService) { }

  displayedColumns: string[] = ['Nombre', 'Prioridad', 'Vencimiento', 'Opciones'];
  public dataSource;

  ngOnInit(): void {
    this.getTasks();
    this.date = new Date();
  }

  calculateDiff(sentDate) {
    var taskDate: any = new Date(sentDate);
    var actualTime: any = new Date();
    var diffDays: any = Math.floor((taskDate - actualTime) / (1000 * 60 * 60));

    return diffDays;
  }


  exit() {
    localStorage.removeItem("uid");
    this.router.navigate(['/newuser']);
  }

  getTasks() {
    const user = <Task>({ "ownerid": localStorage.getItem("uid") })
    this.dataService.getTasks(user as Task)
      .subscribe(response => {
        if (response.success) {
          this.dataSource = response.data;
        }
        else {
          this.addingError = response.data;
        }
      })
  }
  delete(taskid: string) {
    const tasktodelete = <Task>({ "taskid": taskid })
    this.dataService.deleteTask(tasktodelete as Task)
      .subscribe(response => {
        if (response.success) {
          window.location.reload();
          //this.dataSource = response.data;
        }
        else {
          //this.addingError = response.data;
        }
      })
  }


  edit(taskid: string, name: string, priority: string, expire) {
    this.dataService.taskToEdit = <Task>{ "taskid": taskid, "name": name, "priority": priority, "expire": expire };
    this.router.navigate(['/edit-task']);
  }



}
