import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/models/employee.model';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {Router} from '@angular/router';
import Swal from "sweetalert2";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
  providers: [EmployeeService]
})

export class EmployeeListComponent implements OnInit {

  employees: Employee[]=[];
  displayedColumns: string[] = ['name', 'dob', 'username', 'hiredate', 'details', 'update', 'delete'];
  public dataSource = new MatTableDataSource<Employee>();

  constructor(private employeeService: EmployeeService,
              private router: Router) { }

  getEmployees(){
    this.employeeService.getEmployees().subscribe(data => {
      //this.employees=data;
      this.dataSource = new MatTableDataSource(data);
    });
  }

  ngOnInit(): void {
    this.getEmployees();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  sortData(sort: Sort) {
    const data = this.dataSource.data.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;
      return;
    }
    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name': return compare(a.Name, b.Name, isAsc);
        case 'username': return compare(a.UserName, b.UserName, isAsc);
        case 'hiredate': return compare(a.HireDate, b.HireDate, isAsc);
        default: return 0;
      }
    });
  }

  public goToDetails = (id:number) => {
    this.router.navigate(['/view', id]);
  }

  public goToUpdate = (id:number) => {
    this.router.navigate(['/edit', id]);
  }

  public goToDelete = (id:number) => {
    this.employeeService.deleteEmployee(id).subscribe((data: any) => {
      this.getEmployees();
      Swal.fire(
        'Deleted!',
        'Success',
        'success'
      );
    });
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.employeeService.addEmployee({name} as unknown as Employee)
      .subscribe(hero => {
        this.employees.push(hero);
      });
  }

  delete(employee: Employee): void {
    this.employees = this.employeeService.filter(h => h !== employee);
    this.employeeService.deleteEmployee(employee).subscribe();
  }
}
function compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
