import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { BaseService } from 'src/app/services/base.service';
import { Doctor } from '../models/doctor';

@Injectable()
export class DoctorService extends BaseService {

    doctor: Doctor = new Doctor();

    constructor(private http: HttpClient) { super() }

    getAll(): Observable<Doctor[]> {
        return this.http
            .get<Doctor[]>(this.UrlServiceV1 + "doctors")
            .pipe(catchError(super.serviceError));
    }

    getById(id: string): Observable<Doctor> {
        return this.http
            .get<Doctor>(this.UrlServiceV1 + "doctors/" + id, super.GetAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    insertDoctor(doctor: Doctor): Observable<Doctor> {
        return this.http
            .post(this.UrlServiceV1 + "doctors", doctor, this.GetAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    updateDoctor(doctor: Doctor): Observable<Doctor> {
        return this.http
            .put(this.UrlServiceV1 + "doctors/" + doctor.id, doctor, super.GetAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    deleteDoctor(id: string): Observable<Doctor> {
        return this.http
            .delete(this.UrlServiceV1 + "doctors/" + id, super.GetAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }
}
