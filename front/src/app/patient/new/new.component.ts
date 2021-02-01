import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { NgBrazilValidators } from 'ng-brazil';
import { utilsBr } from 'js-brasil';

import { PatientService } from '../services/patient.service';
import { PatientBaseComponent } from '../patient-form.base.component';
import { Doctor } from 'src/app/doctor/models/doctor';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent extends PatientBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  errors: any[] = [];
  patientForm: FormGroup;
  doctor: Doctor = new Doctor();

  textoDocumento: string = 'CPF (required)';

  MASKS = utilsBr.MASKS;
  formResult: string = '';

  constructor(private fb: FormBuilder,
    private patientService: PatientService,
    private router: Router,
    private toastr: ToastrService) {
      super();

      this.validationMessages = {
        name: {
          required: 'Enter Name',
        },
        cpf: {
          required: 'Inform the CPF',
          cpf: 'CPF in invalid format'
        },
        birthDate: {
          required: 'Enter the date of birth',
        }
      };

      super.configureMessagesValidationBase(this.validationMessages);
  }

  ngOnInit() {

    this.patientService.getDoctors()
      .subscribe(
        doctors => this.doctors = doctors);

    this.patientForm = this.fb.group({
      doctorId: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
      cpf: ['', [Validators.required, NgBrazilValidators.cpf]],
      birthDate: ['', [Validators.required]],
    });
  }

  ngAfterViewInit(): void {
    super.configureBaseFormValidation(this.formInputElements);
  }

  insertPatient() {
    if (this.patientForm.dirty && this.patientForm.valid) {
      this.patient = Object.assign({}, this.patient, this.patientForm.value);

      this.patientService.insertPatient(this.patient)
        .subscribe(
          success => { this.processSucess(success) },
          failure => { this.processFailure(failure) }
        );

      this.unsavedChanges = false;
    }
  }

  processSucess(response: any) {
    this.patientForm.reset();
    this.errors = [];

    let toast = this.toastr.success('Patient successfully registered!', 'Success!');
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

