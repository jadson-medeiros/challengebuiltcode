import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { CustomValidators } from 'ngx-custom-validators';
import { ToastrService } from 'ngx-toastr';

import { User } from '../models/user';
import { AccountService } from '../services/account.service';
import { FormBaseComponent } from 'src/app/base-components/form-base.component';


@Component({
  selector: 'app-login',
  templateUrl: './signin.component.html'
})
export class SigninComponent extends FormBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  errors: any[] = [];
  signinForm: FormGroup;
  user: User;

  returnUrl: string;

  constructor(private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService) {

      super();

    this.validationMessages = {
      email: {
        required: 'Enter email',
        email: 'Invalid email'
      },
      password: {
        required: 'Enter password',
        rangeLength: 'The password must be between 6 and 15 characters'
      }
    };

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'];

    super.configureMessagesValidationBase(this.validationMessages);
  }

  ngOnInit(): void {

    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, CustomValidators.rangeLength([6, 15])]]
    });
  }

  ngAfterViewInit(): void {
    super.configureBaseFormValidation(this.formInputElements, this.signinForm);
  }

  signin() {
    if (this.signinForm.dirty && this.signinForm.valid) {
      this.user = Object.assign({}, this.user, this.signinForm.value);

      this.accountService.signin(this.user)
      .subscribe(
          success => {this.proccessSuccess(success)},
          failure => {this.proccessFailure(failure)}
      );
    }
  }

  proccessSuccess(response: any) {
    this.signinForm.reset();
    this.errors = [];

    this.accountService.LocalStorage.saveLocalStorageUser(response);

    let toast = this.toastr.success('Login successfully!', 'You welcome!!!');
    if(toast){
      toast.onHidden.subscribe(() => {
        this.returnUrl
        ? this.router.navigate([this.returnUrl])
        : this.router.navigate(['/home']);
      });
    }
  }

  proccessFailure(fail: any){
    this.errors = fail.error.errors;
    this.toastr.error('An error has occurred!', 'Ops :(');
  }
}
