import { Patient } from 'src/app/patient/models/patient';

export class Doctor {
    id: string;
    name: string;
    crm: string;
    crmuf: string;
    produtos: Patient[]
}

