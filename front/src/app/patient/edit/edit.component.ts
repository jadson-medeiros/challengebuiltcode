import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { NgBrazilValidators } from 'ng-brazil';

import { PatientService } from '../services/patient.service';
import { PatientBaseComponent } from '../patient-form.base.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent extends PatientBaseComponent implements OnInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  constructor(private fb: FormBuilder,
    private patientService: PatientService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService) {

    super();
    this.patient = this.route.snapshot.data['patient'];
  }

  ngOnInit(): void {

    this.patientService.getDoctors()
      .subscribe(
        doctors => this.doctors = doctors);

    this.patientForm = this.fb.group({
      doctorId: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
      cpf: ['', [Validators.required, NgBrazilValidators.cpf]],
      birthDate: ['', [Validators.required]],
    });

    this.patientForm.patchValue({
      doctorId: this.patient.doctorId,
      id: this.patient.id,
      name: this.patient.name,
      cpf: this.patient.cpf,
      birthDate: this.patient.birthDate
    });
    }

  ngAfterViewInit(): void {
    super.configureBaseFormValidation(this.formInputElements);
  }

  updatePatient() {
    if (this.patientForm.dirty && this.patientForm.valid) {
      this.patient = Object.assign({}, this.patient, this.patientForm.value);

      this.patientService.updatePatient(this.patient)
        .subscribe(
          success => { this.processSuccess(success) },
          failure => { this.processFailure(failure) }
        );

      this.unsavedChanges = false;
    }
  }

  processSuccess(response: any) {
    this.patientForm.reset();
    this.errors = [];

    let toast = this.toastr.success('Product successfully edited!', 'Success!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/patients/list-all']);
      });
    }
  }

  processFailure(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('An error has occurred!', 'Ops :(');
  }
}

