import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import { Employee } from 'src/app/models/employee.model';
import { Router } from '@angular/router';
import {FormControl, FormGroupDirective , NgForm, Validators} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Area } from 'src/app/models/area.model';
import { CountryService } from 'src/app/services/country.service';
import { Country } from 'src/app/models/country.model';
import {Observable} from 'rxjs';
import {EmployeeService} from "../../services/employee.service";
import Swal from "sweetalert2";

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss'],
  providers: [CountryService]
})
export class CreateEmployeeComponent implements OnInit {

  public employee: Employee = new Employee();

  addForm: FormGroup;
  name : string;
  username : string;
  matcher = new MyErrorStateMatcher();
  maxDobDate: Date;

  submitted = false;
  selectedArea: string = "";
  selectedJob: string = "";
  selectedCountry: string = "";
  hireDate: Date = null;
  isActive: boolean = false;

  areas: Area[] = [
    {value: 'services', viewValue: 'Services'},
    {value: 'kitchen', viewValue: 'Kitchen'}
  ];
  countries: Country[] = [];

  constructor(private formBuilder: FormBuilder, private router: Router, private countryService: CountryService,
              private employeeService: EmployeeService) {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    this.maxDobDate = new Date(currentYear - 18, currentDate.getMonth(), currentDate.getDate());
   }

   defaultFieldsState(): void {
    this.addForm =  new FormGroup({
      name: new FormControl('', Validators.required),
      selectedArea: new FormControl('', Validators.required),
      selectedJob: new FormControl('', Validators.required),
      selectedCountry : new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      hireDate: new FormControl('', Validators.required),
      dob: new FormControl('', Validators.required),
      tipRate: new FormControl('0', Validators.required),
      isActive: new FormControl('', Validators.required)
    });
   }

  ngOnInit(): void {
    this.getCounties();
    this.defaultFieldsState();
  }

  refreshJobs(event){
    if (event.isUserInput) {
        this.selectedArea = event.source.value;
    }
  }
  getCounties(){
    this.countryService.getCounties().subscribe((data: any) => {
      this.countries = data;
    });
  }

  onSubmit(data: FormGroup | any) {

    if (data.selectedJob === 'waitress' || data.selectedJob ===  'diningmanager'){
      this.employee.Rate = this.addForm.get('tipRate').value;
    }

    if (this.addForm.valid){
      this.employee.Name = this.addForm.get('name').value;
      this.employee.Area = this.addForm.get('selectedArea').value;
      this.employee.JobTitle = this.addForm.get('selectedJob').value;
      this.employee.Country = this.addForm.get('selectedCountry').value;
      this.employee.UserName = this.addForm.get('username').value;
      this.employee.HireDate = this.addForm.get('hireDate').value;
      this.employee.Dob = this.addForm.get('dob').value;
      this.employee.Status = this.addForm.get('isActive').value;
      this.employeeService.addEmployee(this.employee).subscribe(() => {
        Swal.fire(
          'Created!',
          'Success',
          'success'
        );
        this.defaultFieldsState();
      });
    }
  }

  data(event){
    this.selectedJob = event;
    this.addForm.get('selectedJob').setValue(this.selectedJob);
    this.employee.JobTitle = this.selectedJob;
  }
}
