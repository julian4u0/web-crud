import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NewuserComponent } from './newuser/newuser.component';
import { NewtaskComponent } from './newtask/newtask.component';
import { TasksDashboardComponent } from './tasks-dashboard/tasks-dashboard.component'
import { EditTaskComponent } from './edit-task/edit-task.component';

import { RouterModule, Routes } from '@angular/router';;

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  { path: 'newuser', component: NewuserComponent },
  { path: 'tasks-dashboard', component: TasksDashboardComponent },
  { path: 'newtask', component: NewtaskComponent },
  { path: 'edit-task', component: EditTaskComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NewuserComponent,
    TasksDashboardComponent,
    NewtaskComponent,
    EditTaskComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
