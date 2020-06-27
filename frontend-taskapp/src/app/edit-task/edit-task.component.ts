import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { DataService } from '../data.service';
import { Task } from '../Task';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  taskForm;
  public taskError: any;


  constructor(private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder, private dataService: DataService) {

    this.taskForm = this.formBuilder.group({
      name: this.dataService.taskToEdit.name,
      priority: this.dataService.taskToEdit.priority,
      expire: this.dataService.taskToEdit.expire
    })
  }

  updateTask(taskData) {

    taskData.taskid = this.dataService.taskToEdit.taskid;
    this.dataService.updateTask(taskData as Task)
      .subscribe(response => {
        if (response.data) {
          this.router.navigate(['/tasks-dashboard']);
        }
        else {
          this.taskError = response.data;
        }
      })

  }




  ngOnInit(): void {
  }

}
