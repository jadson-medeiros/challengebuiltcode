import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgBrazil } from 'ng-brazil';
import { TextMaskModule } from 'angular2-text-mask';
import { NgxSpinnerModule } from "ngx-spinner";

import { PatientRoutingModule } from './patient.route';
import { PatientAppComponent } from './patient.app.component';
import { ListComponent } from './list/list.component';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { DeleteComponent } from './delete/delete.component';
import { DetailsComponent } from './details/details.component';
import { PatientService } from './services/patient.service';
import { PatientResolve } from './services/patient.resolve';
import { PatientGuard } from './services/patient.guard';

@NgModule({
  declarations: [
    PatientAppComponent,
    ListComponent,
    NewComponent,
    EditComponent,
    DeleteComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    NgBrazil,
    TextMaskModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    PatientService,
    PatientResolve,
    PatientGuard
  ]
})
export class PatientModule { }
