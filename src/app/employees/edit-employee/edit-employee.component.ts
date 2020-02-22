import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EmployeeService} from '../../services/employee.service';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Area} from "../../models/area.model";
import {CountryService} from "../../services/country.service";
import {MyErrorStateMatcher} from "../create-employee/create-employee.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {AlertDialogComponent} from "../../alert-dialog/alert-dialog.component";
import Swal from 'sweetalert2'
import {Employee} from "../../models/employee.model";

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit {
  displayedColumns: any;
  public id;
  public employee: Employee;
  public message;
  public form: FormGroup;

  selectedArea: string = "";
  selectedJob: string = "";
  selectedCountry: string = "";
  hireDate: Date = null;
  isActive: boolean = false;
  matcher = new MyErrorStateMatcher();
  maxDobDate: Date;

  areas: Area[] = [
    {value: 'services', viewValue: 'Services'},
    {value: 'kitchen', viewValue: 'Kitchen'}
  ];
  countries: any[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private employeeService: EmployeeService,
              private countryService: CountryService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getCounties();
    this.form =  new FormGroup({
      name: new FormControl('', Validators.required),
      selectedArea: new FormControl('', Validators.required),
      selectedJob: new FormControl('', Validators.required),
      selectedCountry : new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      hireDate: new FormControl('', Validators.required),
      dob: new FormControl('', Validators.required),
      tipRate: new FormControl('', Validators.required),
      isActive: new FormControl('', Validators.required)
    });
    this.activatedRoute.params.subscribe((params: any) => {
      this.id = params.id;
      this.employeeService.getEmployee(params.id).subscribe((data: any) => {
        this.employee = data;
        this.form.get('name').setValue(this.employee.Name);
        this.form.get('selectedArea').setValue(this.employee.Area);
        this.form.get('selectedJob').setValue(this.employee.JobTitle);
        this.form.get('selectedCountry').setValue(this.employee.Country);
        this.form.get('username').setValue(this.employee.UserName);
        this.form.get('hireDate').setValue(this.employee.HireDate);
        this.form.get('dob').setValue(this.employee.Dob);
        this.form.get('tipRate').setValue(this.employee.Rate);
        this.form.get('isActive').setValue(this.employee.Status);
      });
    });

  }

  edit(form: FormGroup | any){
    this.form.get('selectedJob').setValue(this.selectedJob);
    this.form.get('selectedArea').setValue(this.selectedArea);

    this.employee.JobTitle = this.form.get('selectedJob').value;
    this.employee.Country = this.form.get('selectedCountry').value;

    if (form.selectedJob === 'waitress' || form.selectedJob ===  'diningmanager'){
      this.employee.Rate = this.form.get('tipRate').value;
    }else {
      this.form.get('tipRate').setValue(0);
    }
    
    if (this.form.valid){
      this.assing();
      this.employeeService.updateEmployee(this.employee).subscribe((data) => {
        this.assing();
        Swal.fire(
          'Updated!',
          'Success',
          'success'
        );
      });
    }

  }

  assing(){
    this.employee.JobTitle = this.selectedJob;
    this.employee.Name = this.form.get('name').value;
    this.employee.Area = this.form.get('selectedArea').value;
    this.employee.JobTitle = this.form.get('selectedJob').value;
    this.employee.Country = this.form.get('selectedCountry').value;
    this.employee.UserName = this.form.get('username').value;
    this.employee.HireDate = this.form.get('hireDate').value;
    this.employee.Dob = this.form.get('dob').value;
    this.employee.Status = this.form.get('isActive').value;
  }

  getCounties(){
    this.countryService.getCounties().subscribe((data: any) => {
      this.countries = data;
    });
  }

  refreshJobs(event){
    if (event.isUserInput) {
        this.selectedArea = event.source.value;
    }
  }

  data(event){
    this.selectedJob = event;
    this.form.get('selectedJob').setValue(this.selectedJob);
    this.employee.JobTitle = this.selectedJob;
  }

}
