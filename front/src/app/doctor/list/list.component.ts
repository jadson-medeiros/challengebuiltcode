import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../services/doctor.service';
import { Doctor } from '../models/doctor';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {
  public doctors: Doctor[];
  errorMessage: string;

  constructor(private doctorService: DoctorService) { }

  ngOnInit(): void {
    this.doctorService.getAll()
      .subscribe(
        doctors => this.doctors = doctors,
        error => this.errorMessage);
  }
}
