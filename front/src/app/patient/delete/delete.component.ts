import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from '../services/patient.service';

import { ToastrService } from 'ngx-toastr';

import { Patient } from '../models/patient';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html'
})
export class DeleteComponent  {
  patient: Patient;

  constructor(private patientService: PatientService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) {

    this.patient = this.route.snapshot.data['patient'];
  }

  public deletePatient() {
    this.patientService.deletePatient(this.patient.id)
      .subscribe(
      event => { this.successDelete(event) },
      ()     => { this.failure() }
      );
  }

  public successDelete(event: any) {
    const toast = this.toastr.success('Product successfully deleted!', 'Good bye :D');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/patients/list-all']);
      });
    }
  }

  public failure() {
    this.toastr.error('There was an error processing!', 'Ops! :(');
  }
}

