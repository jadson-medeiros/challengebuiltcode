import { Component } from '@angular/core';
import { Doctor } from '../models/doctor';

import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService } from '../services/doctor.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html'
})
export class DeleteComponent {

  doctor: Doctor = new Doctor();
  errors: any[] = [];

  constructor(
    private doctorService: DoctorService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) {
    this.doctor = this.route.snapshot.data['doctor'];
  }

  deleteDoctor() {
    this.doctorService.deleteDoctor(this.doctor.id)
      .subscribe(
        doctor => { this.successDelete(doctor) },
        error => { this.failure(error) }
      );
  }

  successDelete(evento: any) {

    const toast = this.toastr.success('Doctor successfully deleted!', 'Good bye :D');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/doctors/list-all']);
      });
    }
  }

  failure(fail) {
    this.errors = fail.error.errors;
    this.toastr.error('There was an error processing!', 'Ops! :(');
  }
}
