import { Component, OnInit } from '@angular/core';
import {Employee} from "../../models/employee.model";
import {EmployeeService} from "../../services/employee.service";
import {ActivatedRoute, Params} from "@angular/router";
import {CountryService} from "../../services/country.service";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  public employee: any;
  public id;

  constructor(private employeeService: EmployeeService,
              private activatedRoute: ActivatedRoute,
              private countryService: CountryService) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe((params: Params) => {
      this.employeeService.getEmployee(params.id).subscribe((data: any) => {
        this.id = params.id;
       this.employee = data;
      });
    });
  }

}
