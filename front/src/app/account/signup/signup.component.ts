import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormControlName } from '@angular/forms';
import { Router } from '@angular/router';

import { CustomValidators } from 'ngx-custom-validators';
import { ToastrService } from 'ngx-toastr';

import { User } from '../models/user';
import { AccountService } from '../services/account.service';

import { FormBaseComponent } from 'src/app/base-components/form-base.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent extends FormBaseComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  errors: any[] = [];
  signupForm: FormGroup;
  user: User;

  constructor(private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
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
      },
      confirmPassword: {
        required: 'Enter the password again',
        rangeLength: 'The password must be between 6 and 15 characters',
        equalTo: 'Passwords do not match'
      }
    };

    super.configureMessagesValidationBase(this.validationMessages);
  }

  ngOnInit(): void {

    let senha = new FormControl('', [Validators.required, CustomValidators.rangeLength([6, 15])]);
    let senhaConfirm = new FormControl('', [Validators.required, CustomValidators.rangeLength([6, 15]),
      CustomValidators.equalTo(senha)]);

    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: senha,
      confirmPassword: senhaConfirm
    });
  }

  ngAfterViewInit(): void {
    super.configureBaseFormValidation(this.formInputElements, this.signupForm);
  }

  addAccount() {
    if (this.signupForm.dirty && this.signupForm.valid) {
      this.user = Object.assign({}, this.user, this.signupForm.value);

      this.accountService.registerUser(this.user)
        .subscribe(
          success => { this.proccessSuccess(success) },
          failure => { this.proccessFailure(failure) }
        );

      this.unsavedChanges = false;
    }
  }

  proccessSuccess(response: any) {
    this.signupForm.reset();
    this.errors = [];

    this.accountService.LocalStorage.saveLocalStorageUser(response);

    let toast = this.toastr.success('Registro realizado com Sucesso!', 'Bem vindo!!!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/home']);
      });
    }
  }

  proccessFailure(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }
}
