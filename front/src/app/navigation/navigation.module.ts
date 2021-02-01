import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MenuSigninComponent } from './menu-signin/menu-signin.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';

@NgModule({
    declarations: [
        MenuComponent,
        MenuSigninComponent,
        HomeComponent,
        FooterComponent,
        NotFoundComponent,
        AccessDeniedComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        NgbModule
    ],
    exports: [
        MenuComponent,
        MenuSigninComponent,
        HomeComponent,
        FooterComponent,
        NotFoundComponent,
        AccessDeniedComponent
    ]
})
export class NavegacaoModule { }
