import { Injectable } from '@angular/core';
import { CanDeactivate, CanActivate, Router } from '@angular/router';
import { SignupComponent } from '../signup/signup.component';
import { LocalStorageUtils } from 'src/app/utils/localstorage';

@Injectable()
export class AccountGuard implements CanDeactivate<SignupComponent>, CanActivate {
    localStorageUtils = new LocalStorageUtils();

    constructor(private router: Router){}

    canDeactivate(component: SignupComponent) {
        if(component.unsavedChanges) {
            return window.confirm('Are you sure you want to abandon filling in the form?');
        }

        return true
    }

    canActivate() {
        if(this.localStorageUtils.getTokenUser()){
            this.router.navigate(['/home']);
        }

        return true;
    }
}
