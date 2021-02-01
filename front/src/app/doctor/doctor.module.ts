import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewComponent } from './new/new.component';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { DoctorRoutingModule } from './doctor.route';
import { DoctorAppComponent } from './doctor.app.component';
import { ListComponent } from './list/list.component';
import { DoctorService } from './services/doctor.service';

import { NgBrazil } from 'ng-brazil';
import { TextMaskModule } from 'angular2-text-mask';
import { NgxSpinnerModule } from "ngx-spinner";

import { EditComponent } from './edit/edit.component';
import { DeleteComponent } from './delete/delete.component';
import { DetailsComponent } from './details/details.component';
import { DoctorResolve } from './services/doctor.resolve';
import { DoctorGuard } from './services/doctor.guard';
import { ListPatientsComponent } from './patients/list-patients.component';

@NgModule({
  declarations: [
    DoctorAppComponent,
    NewComponent,
    ListComponent,
    EditComponent,
    DeleteComponent,
    DetailsComponent,
    ListPatientsComponent
  ],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgBrazil,
    TextMaskModule,
    NgxSpinnerModule
  ],
  providers: [
    DoctorService,
    DoctorResolve,
    DoctorGuard
  ]
})
export class DoctorModule { }
