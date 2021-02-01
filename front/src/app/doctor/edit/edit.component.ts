import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';

import { Doctor } from '../models/doctor';
import { DoctorService } from '../services/doctor.service';
import { FormBaseComponent } from 'src/app/base-components/form-base.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent extends FormBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  errors: any[] = [];
  doctorForm: FormGroup;

  doctor: Doctor = new Doctor();

  constructor(private fb: FormBuilder,
    private doctorService: DoctorService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService) {

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

    this.doctor = this.route.snapshot.data['doctor'];
  }

  ngOnInit() {

    this.spinner.show();

    this.doctorForm = this.fb.group({
      id: '',
      name: ['', [Validators.required]],
      crm: ['', [Validators.required]],
      crmuf: ['', [Validators.required]]
    });

    this.fillForm();

    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  fillForm() {
    this.doctorForm.patchValue({
      id: this.doctor.id,
      name: this.doctor.name,
      crm: this.doctor.crm,
      crmUf: this.doctor.crmuf
    });
  }

  updateDoctor() {
    if (this.doctorForm.dirty && this.doctorForm.valid) {
      this.doctor = Object.assign({}, this.doctor, this.doctorForm.value);
      this.doctorService.updateDoctor(this.doctor)
        .subscribe(
          success => { this.proccessSuccess(success) },
          failure => { this.proccessFailure(failure) }
        );
    }
  }

  proccessSuccess(response: any) {
    this.errors = [];

    let toast = this.toastr.success('Doctor updated successfully!', 'Success!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/doctors/list-all']);
      });
    }
  }

  proccessFailure(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('An error has occurred!', 'Ops :(');
  }

  openModal(content) {
    this.modalService.open(content);
  }
}
