import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Doctor } from '../models/doctor';
import { DoctorService } from './doctor.service';

@Injectable()
export class DoctorResolve implements Resolve<Doctor> {

    constructor(private doctorService: DoctorService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.doctorService.getById(route.params['id']);
    }
}
