import { Injectable } from '@angular/core';
import { CanDeactivate, Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { NewComponent } from '../new/new.component';
import { BaseGuard } from 'src/app/services/base.guard';

@Injectable()
export class PatientGuard extends BaseGuard implements CanActivate, CanDeactivate<NewComponent> {
    constructor(protected router: Router){ super(router); }

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
