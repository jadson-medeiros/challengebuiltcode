import { Component, OnInit } from '@angular/core';
import { Patient } from '../models/patient';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {
  public patients: Patient[];
  errorMessage: string;

  constructor(private patientService: PatientService) { }

  ngOnInit(): void {
    this.patientService.getAll()
      .subscribe(
        patients => this.patients = patients,
        error => this.errorMessage);
  }
}
