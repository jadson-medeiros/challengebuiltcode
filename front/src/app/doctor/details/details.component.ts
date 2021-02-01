import { Component } from '@angular/core';
import { Doctor } from '../models/doctor';
import { DomSanitizer } from '@angular/platform-browser';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html'
})
export class DetailsComponent {
  doctor: Doctor = new Doctor();

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer) {

      this.doctor = this.route.snapshot.data['doctor'];
  }
}
