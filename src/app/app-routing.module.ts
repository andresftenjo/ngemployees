import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {EmployeesComponent} from "./employees/employees.component";
import {CreateEmployeeComponent} from "./employees/create-employee/create-employee.component";
import {EditEmployeeComponent} from "./employees/edit-employee/edit-employee.component";
import {EmployeeComponent} from "./employees/employee/employee.component";

const routes: Routes = [
  { path: '', component: EmployeesComponent },
  { path: 'add', component: CreateEmployeeComponent },
  { path: 'edit/:id', component: EditEmployeeComponent },
  { path: 'view/:id', component: EmployeeComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
