import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateEmployeeComponent } from './employees/create-employee/create-employee.component';
import { EmployeesComponent } from './employees/employees.component';

const routes: Routes = [
  { path: 'add', component: CreateEmployeeComponent },
  { path: '', component: EmployeesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
