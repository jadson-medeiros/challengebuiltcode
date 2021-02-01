import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DoctorAppComponent } from './doctor.app.component';
import { NewComponent } from './new/new.component';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { DetailsComponent } from './details/details.component';
import { DeleteComponent } from './delete/delete.component';
import { DoctorResolve } from './services/doctor.resolve';
import { DoctorGuard } from './services/doctor.guard';

const doctorRouterConfig: Routes = [
    {
        path: '', component: DoctorAppComponent,
        children: [
            { path: 'list-all', component: ListComponent },
            {
                path: 'new', component: NewComponent,
                canDeactivate: [DoctorGuard],
                canActivate: [DoctorGuard],
                data: [{ claim: { nome: 'Doctor', valor: 'New'}}]
            },
            {
                path: 'edit/:id', component: EditComponent,
                canActivate: [DoctorGuard],
                data: [{ claim: { nome: 'Doctor', valor: 'Update' } }],
                resolve: {
                    doctor: DoctorResolve
                }
            },
            {
                path: 'details/:id', component: DetailsComponent,
                resolve: {
                  doctor: DoctorResolve
                }
            },
            {
                path: 'delete/:id', component: DeleteComponent,
                canActivate: [DoctorGuard],
                data: [{ claim: { nome: 'Doctor', valor: 'Delete' } }],
                resolve: {
                  doctor: DoctorResolve
                }
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(doctorRouterConfig)
    ],
    exports: [RouterModule]
})
export class DoctorRoutingModule { }
