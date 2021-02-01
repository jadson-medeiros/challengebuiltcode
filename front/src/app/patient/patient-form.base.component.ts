import { Patient, Doctor } from './models/patient';
import { FormGroup } from '@angular/forms';
import { ElementRef } from '@angular/core';

import { utilsBr } from 'js-brasil';

import { FormBaseComponent } from '../base-components/form-base.component';

export abstract class PatientBaseComponent extends FormBaseComponent {

    patient: Patient;
    doctors: Doctor[];
    errors: any[] = [];
    patientForm: FormGroup;

    MASKS = utilsBr.MASKS;

    constructor() {
        super();

        this.validationMessages = {
            doctorId: {
                required: 'Choose a Doctor',
            },
            name: {
                required: 'Enter Name',
                minlength: '2 characters minimum',
                maxlength: '200 characters maximum'
            },
            cpf: {
                required: 'Inform the CPF',
                minlength: '2 characters minimum',
                maxlength: '11 characters maximum'
            },
            birthDate: {
                required: 'Enter the Birthday Date',
            }
        }

        super.configureMessagesValidationBase(this.validationMessages);
    }

    protected configureBaseFormValidation(formInputElements: ElementRef[]) {
        super.configureBaseFormValidation(formInputElements, this.patientForm);
    }
}
