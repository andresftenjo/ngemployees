import { Component, OnInit , Input } from '@angular/core';
import { JobTitle } from '../models/job-title.model';

@Component({
  selector: 'app-job-title',
  templateUrl: './job-title.component.html',
  styleUrls: ['./job-title.component.scss']
})
export class JobTitleComponent implements OnInit {

  @Input() selectedArea: string;

  jobTitles1: JobTitle[] = [
    {value: 'manager', viewValue: 'Manager'},
    {value: 'tuttofare', viewValue: 'Tuttofare'},
    {value: 'waitress', viewValue: 'Waitress'},
    {value: 'diningmanager', viewValue: 'Dining room manager'}
  ];

  jobTitles2: JobTitle[] = [
    {value: 'souschef', viewValue: 'Sous-Chef'},
    {value: 'chef', viewValue: 'Chef'},
    {value: 'dishwasher', viewValue: 'Dishwasher'},
    {value: 'cook', viewValue: 'Cook'},
  ];

  selectedJob: string = "";

  constructor() { }

  ngOnInit(): void {

  }
  ngOnChanges() : void {
    console.log(this.selectedArea);
  }

  setJob(event){
    //this.selectedJob = event.source.value;
    //console.log(this.selectedJob);
  }
}
