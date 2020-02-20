import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/models/employee.model';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

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

  constructor(private employeeService: EmployeeService) { }

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

  }
  public goToUpdate = (id:number) => {
    console.log(id);
  }
  public goToDelete = (id:number) => {

  }
}
function compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
