import { Component } from '@angular/core';
import { Patient } from '../models/patient';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html'
})
export class DetailsComponent {
  patient: Patient;

  constructor(private route: ActivatedRoute) {
    this.patient = this.route.snapshot.data['patient'];
  }
}
