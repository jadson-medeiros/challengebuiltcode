import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { Doctor } from '../models/doctor';
import { DoctorService } from '../services/doctor.service';
import { FormBaseComponent } from 'src/app/base-components/form-base.component';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent extends FormBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  errors: any[] = [];
  doctorForm: FormGroup;
  doctor: Doctor = new Doctor();

  formResult: string = '';

  constructor(private fb: FormBuilder,
    private doctorService: DoctorService,
    private router: Router,
    private toastr: ToastrService) {

    super();

    this.validationMessages = {
      name: {
        required: 'Enter Name',
      },
      crm: {
        required: 'Inform CRM',
      },
      crmUf: {
        required: 'Inform CRMUF',
      }
    };

    super.configureMessagesValidationBase(this.validationMessages);
  }

  ngOnInit() {
    this.doctorForm = this.fb.group({
      name: ['', [Validators.required]],
      crm: ['', [Validators.required]],
      crmUf: ['', [Validators.required]]
    });

    this.doctorForm.patchValue({ tipoFornecedor: '1', ativo: true });
  }

  insertDoctor() {
    if (this.doctorForm.dirty && this.doctorForm.valid) {
      this.doctor = Object.assign({}, this.doctor, this.doctorForm.value);
      this.formResult = JSON.stringify(this.doctor);

      this.doctorService.insertDoctor(this.doctor)
        .subscribe(
          success => { this.proccessSuccess(success) },
          failure => { this.proccessFailure(failure) }
        );
    }
  }

  proccessSuccess(response: any) {
    this.doctorForm.reset();
    this.errors = [];

    this.unsavedChanges = false;

    let toast = this.toastr.success('Doctor successfully registered!', 'Success!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/doctors/list-all']);
      });
    }
  }

  proccessFailure(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('An error has occurred!', 'Opa :(');
  }
}
