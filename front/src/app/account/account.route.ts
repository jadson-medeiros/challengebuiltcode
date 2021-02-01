import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountAppComponent } from './account.app.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { AccountGuard } from './services/account.guard';

const accountRouterConfig: Routes = [
    {
        path: '', component: AccountAppComponent,
        children: [
            { path: 'signup', component: SignupComponent,
              canActivate: [AccountGuard],
              canDeactivate: [AccountGuard]
            },
            { path: 'signin', component: SigninComponent,
              canActivate: [AccountGuard]
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(accountRouterConfig)
    ],
    exports: [RouterModule]
})
export class AccountRoutingModule { }
