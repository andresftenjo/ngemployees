import {InMemoryDbService} from 'angular-in-memory-web-api';
import {Employee} from '../models/employee.model';


export class EmployeesData implements InMemoryDbService {
  createDb(){
    const employees: Employee[]=[
      {
        Id: 1,
        Name: 'Andres',
        Area: '',
        Dob: new Date('April 11, 1989 00:00:00'),
        JobTitle:'',
        Country:'',
        UserName:'andres@outlook.com',
        HireDate:new Date('December 17, 2015 00:00:00'),
        Rate:'',
        Status:false
      },
      {
        Id: 2,
        Name: 'Felipe',
        Area: '',
        Dob: new Date('May 16, 1990 00:00:00'),
        JobTitle:'',
        Country:'',
        UserName:'felipe@live.com',
        HireDate:new Date('July 19, 2013 00:00:00'),
        Rate:'',
        Status:false
      }
    ];
    return {employees};
  }
}
