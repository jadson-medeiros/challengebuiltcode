import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, CanDeactivate } from '@angular/router';
import { NewComponent } from '../new/new.component';
import { BaseGuard } from 'src/app/services/base.guard';

@Injectable()
export class DoctorGuard extends BaseGuard implements CanActivate, CanDeactivate<NewComponent> {
    constructor(protected router: Router) { super(router); }

    canDeactivate(component: NewComponent) {
        if(component.unsavedChanges) {
            return window.confirm('Are you sure you want to abandon filling in the form?');
        }
        return true
    }

    canActivate(routeAc: ActivatedRouteSnapshot) {
        return super.validateClaims(routeAc);
    }
}
