import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { Task } from '../Task';

@Component({
  selector: 'app-newtask',
  templateUrl: './newtask.component.html',
  styleUrls: ['./newtask.component.css']
})
export class NewtaskComponent implements OnInit {

  taskForm;
  public taskError: any;

  constructor(private formBuilder: FormBuilder, private dataService: DataService, private router: Router) {
    this.taskForm = this.formBuilder.group({
      name: '',
      priority: '',
      expire: ''
    })
  }

  ngOnInit(): void {
  }

  createTask(taskData) {


    taskData.ownerid = localStorage.getItem("uid");

    this.dataService.createTask(taskData as Task)
      .subscribe(response => {
        if (response.data) {
          this.router.navigate(['/tasks-dashboard']);
        }
        else {
          this.taskError = response.data;
        }
      })

  }

}
