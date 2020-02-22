import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AppRoutingModule }     from './app-routing.module';

import { AppComponent } from './app.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeComponent } from './employees/employee/employee.component';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { CreateEmployeeComponent } from './employees/create-employee/create-employee.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from './services/employee.service';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api'
import { EmployeesData } from './dbservices/employees-data';
import { HttpClientModule } from '@angular/common/http';

import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDividerModule} from '@angular/material/divider';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import { AgeFormDate } from './pipes/age-form-date';

import {MatInputModule} from '@angular/material/input';
import { JobTitleComponent } from './job-title/job-title.component';
import { EditEmployeeComponent } from './employees/edit-employee/edit-employee.component';
import { MessagesComponent} from "./messages/messages.component";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import {CountryService} from "./services/country.service";

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    HttpClientModule,
    MatFormFieldModule,
    MatDividerModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRippleModule,
    MatSelectModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientInMemoryWebApiModule.forRoot( // Remove it when a real server is ready to receive requests.
      EmployeesData, { passThruUnknownUrl: true }
    )
  ],
  declarations: [
    AppComponent,
    EmployeesComponent,
    EmployeeComponent,
    EmployeeListComponent,
    AgeFormDate,
    CreateEmployeeComponent,
    JobTitleComponent,
    EditEmployeeComponent,
    MessagesComponent,
    AlertDialogComponent
  ],
  providers: [CountryService],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
