import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Patient } from '../models/patient';
import { PatientService } from './patient.service';

@Injectable()
export class PatientResolve implements Resolve<Patient> {
    constructor(private patientService: PatientService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.patientService.getById(route.params['id']);
    }
}
