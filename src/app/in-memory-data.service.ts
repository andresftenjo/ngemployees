import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Employee } from './models/employee.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const employees: Employee[]=[
      {
        id: 1,
        Name: 'Andres',
        Area: 'kitchen',
        Dob: new Date('April 11, 1989 00:00:00'),
        JobTitle:'souschef',
        Country:'Spain',
        UserName:'andres@outlook.com',
        HireDate:new Date('December 17, 2015 00:00:00'),
        Rate:'',
        Status:false
      },
      {
        id: 2,
        Name: 'Felipe',
        Area: 'kitchen',
        Dob: new Date('May 16, 1990 00:00:00'),
        JobTitle:'souschef',
        Country:'Spain',
        UserName:'felipe@live.com',
        HireDate:new Date('July 19, 2013 00:00:00'),
        Rate:'',
        Status:false
      },
      {
        id: 3,
        Name: 'Camilo',
        Area: 'kitchen',
        Dob: new Date('July 22, 1982 00:00:00'),
        JobTitle:'souschef',
        Country:'Spain',
        UserName:'camilo88@hotmail.com',
        HireDate:new Date('September 27, 2019 00:00:00'),
        Rate:'',
        Status:false
      }
    ];
    return {employees};
  }

  genId(employees: Employee[]): number {
    return employees.length > 0 ? Math.max(...employees.map(employee => employee.id)) + 1 : 11;
  }
}
