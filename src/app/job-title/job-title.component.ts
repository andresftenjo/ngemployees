import {Component, OnInit, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import { JobTitle } from '../models/job-title.model';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-job-title',
  templateUrl: './job-title.component.html',
  styleUrls: ['./job-title.component.scss']
})
export class JobTitleComponent implements OnInit, OnChanges {

  @Input() selectedArea: string;
  @Input() selectedJobIn: string;
  @Output() sendJob = new EventEmitter();

  public form: FormGroup;

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
    this.form = new FormGroup({
      selectedJob: new FormControl()
    });
    if (this.selectedJobIn){
      this.selectedJob = this.selectedJobIn;
    }

  }
  ngOnChanges() : void {
  }

  setJob(event){
    this.selectedJob = event.source.value;
    this.sendJob.emit(this.selectedJob);
  }

}
