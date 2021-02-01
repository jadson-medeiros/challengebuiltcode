import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { BaseService } from 'src/app/services/base.service';
import { Patient, Doctor } from '../models/patient';

@Injectable()
export class PatientService extends BaseService {

    constructor(private http: HttpClient) { super() }

    getAll(): Observable<Patient[]> {
        return this.http
            .get<Patient[]>(this.UrlServiceV1 + "patients", super.GetAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    getById(id: string): Observable<Patient> {
        return this.http
            .get<Patient>(this.UrlServiceV1 + "patients/" + id, super.GetAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    insertPatient(patient: Patient): Observable<Patient> {
        return this.http
            .post(this.UrlServiceV1 + "patients", patient, super.GetAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    updatePatient(patient: Patient): Observable<Patient> {
        return this.http
            .put(this.UrlServiceV1 + "patients/" + patient.id, patient, super.GetAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    deletePatient(id: string): Observable<Patient> {
        return this.http
            .delete(this.UrlServiceV1 + "patients/" + id, super.GetAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    getDoctors(): Observable<Doctor[]> {
        return this.http
            .get<Doctor[]>(this.UrlServiceV1 + "doctors")
            .pipe(catchError(super.serviceError));
    }
}
