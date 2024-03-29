import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEvaluationComponent } from './components/add-evaluation/add-evaluation.component';
import { EvaluationComponent } from './components/evaluation/evaluation.component';
import { HomeComponent } from './components/home/home.component';
import { DadminComponent } from './components/dadmin/dadmin.component';
import { AddPublicationComponent } from './components/publicationn/add-publication/add-publication.component';
import { SpecialiteComponent } from './components/specialite/specialite.component';
import { AddSpecialiterComponent } from './components/add-specialiter/add-specialiter.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponentComponent } from './components/login-component/login-component.component';
//import { ListuseruComponentComponent } from './components/listuseru-component/listuseru-component.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { UserListComponentComponent } from './components/user-list-component/user-list-component.component';
import { AuthGardService } from './service/auth-gard.service';
import { RoleGuardService } from './service/role-guard.service';
import { GoogleCallbackComponent } from './components/google-callback/google-callback.component';
import { ResetPasswordGuardService } from './service/reset-password-guard.service';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';
//import { AuthGuard } from './service/auth.guard';
const routes: Routes = [

   { path: 'home', component: HomeComponent }, // Assurez-vous que HomeComponent est importé
    // Autres routes...

  { path: 'evaluation', component: EvaluationComponent, canActivate: [AuthGardService] },
  {path :'4',component:HomeComponent},
  { path: 'add-evaluation', component: AddEvaluationComponent },
  { path: 'dadmin', component: DadminComponent },
  { path: 'add-publication', component: AddPublicationComponent },
  { path: 'specialite', component: SpecialiteComponent },
  { path: 'add-specialiter', component: AddSpecialiterComponent},
  { path: 'register', component: RegisterComponent},
 // { path: 'login', component: LoginComponentComponent},
  { path: 'ForgetPassword', component: ForgetPasswordComponent},
  { path: 'google-callback', component: GoogleCallbackComponent },

  { path: 'listUseur', component: UserListComponentComponent ,canActivate: [RoleGuardService], data: { requiredRole:'ADMINISTRATOR'} },
  { path: 'login', component: LoginComponentComponent, canActivate: [AuthGardService] },
  { path: 'account-settings', component: AccountSettingsComponent, canActivate: [AuthGardService] },
 /* { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard] },

  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [RoleGuard], data: { requiredRole: 'ADMIN' } }*/
{path:'change-password',component:ChangePasswordComponent, canActivate: [ResetPasswordGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule]
})


export class AppRoutingModule{}

