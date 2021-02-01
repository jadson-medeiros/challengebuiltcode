import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientAppComponent } from './patient.app.component';
import { ListComponent } from './list/list.component';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { DetailsComponent } from './details/details.component';
import { DeleteComponent } from './delete/delete.component';
import { PatientResolve } from './services/patient.resolve';
import { PatientGuard } from './services/patient.guard';

const patientRouterConfig: Routes = [
    {
        path: '', component: PatientAppComponent,
        children: [
            { path: 'list-all', component: ListComponent },
            {
                path: 'add-new', component: NewComponent,
                canDeactivate: [PatientGuard],
                canActivate: [PatientGuard],
                data: [{ claim: { nome: 'Patient', valor: 'Insert' } }],
            },
            {
                path: 'edit/:id', component: EditComponent,
                canActivate: [PatientGuard],
                data: [{ claim: { nome: 'Patient', valor: 'Update' } }],
                resolve: {
                  patient: PatientResolve
                }
            },
            {
                path: 'details/:id', component: DetailsComponent,
                resolve: {
                  patient: PatientResolve
                }
            },
            {
                path: 'delete/:id', component: DeleteComponent,
                canActivate: [PatientGuard],
                data: [{ claim: { nome: 'Patient', valor: 'Delete' } }],
                resolve: {
                  patient: PatientResolve
                }
            },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(patientRouterConfig)
    ],
    exports: [RouterModule]
})
export class PatientRoutingModule { }
