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

  constructor(private formBuilder: FormBuilder, private router: Router, private countryService: CountryService) {

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    this.maxDobDate = new Date(currentYear - 18, currentDate.getMonth(), currentDate.getDate());
   }

  ngOnInit(): void {
    this.getCounties();
    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
      selectedArea: ['', Validators.required],
      selectedJob:  ['', Validators.required],
      selectedCountry : ['', Validators.required],
      username: ['', Validators.required],
      hireDate: ['', Validators.required],
      isActive: ['', Validators.required]
    });
  }

  refreshJobs(event){
    this.selectedArea = event.source.value;
  }

  getCounties(){
    this.countryService.getCounties().subscribe(data => {
      this.countries = data;
    });
  }

  onSubmit() {

  }

}
