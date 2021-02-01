import { Component, Input } from '@angular/core';
import { Patient } from 'src/app/patient/models/patient';

@Component({
  selector: 'list-patient',
  templateUrl: './list-patients.component.html'
})
export class ListPatientsComponent {
  @Input()
  patients: Patient[];
}
