import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
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
import {SpecialiteComponent} from "./components/specialite/specialite.component";
import {ClasseComponent} from "./components/classe/classe.component";
import {ClasseListComponent} from "./components/classe-list/classe-list.component";
import {ListSpecialiteComponent} from "./components/list-specialite/list-specialite.component";
import {ShowClasseSpComponent} from "./components/show-classe-sp/show-classe-sp.component";
import {ListEtudiantByClaaseComponent} from "./components/list-etudiant-by-claase/list-etudiant-by-claase.component";
import {ListEnsignatByClasseComponent} from "./components/list-ensignat-by-classe/list-ensignat-by-classe.component";
import {ListEtudiantToAffComponent} from "./components/list-etudiant-to-aff/list-etudiant-to-aff.component";
import {ListEnseignatToAffComponent} from "./components/list-enseignat-to-aff/list-enseignat-to-aff.component";
import {StatEtudiantParSpeComponent} from "./components/stat-etudiant-par-spe/stat-etudiant-par-spe.component";
import {StatProffParSpcComponent} from "./components/stat-proff-par-spc/stat-proff-par-spc.component";
import {EngToShComponent} from "./components/eng-to-sh/eng-to-sh.component";

import {FinalCLASSComponent} from "./components/final-class/final-class.component";
import {SessionCLASSComponent} from "./components/session-class/session-class.component";
import {SessionPROFComponent} from "./components/session-prof/session-prof.component";
import {NavEtudiantSpecComponent} from "./components/nav-etudiant-spec/nav-etudiant-spec.component";
import {SesionSchComponent} from "./components/sesion-sch/sesion-sch.component";
import {ScheduleComponent} from "./components/schedule/schedule.component";
import {SessionComponent} from "./components/session/session.component";
import {EmploiComponent} from "./components/emploi/emploi.component";
import {EvaluationComponent} from "./components/evaluation/evaluation.component";
import {EvaluationAssessmentComponent} from "./components/evaluation-assessment/evaluation-assessment.component";
import {AddEvaluationComponent} from "./components/add-evaluation/add-evaluation.component";
import {EvaluationDetailsComponent} from "./components/evaluation/evaluation-details/evaluation-details.component";
import {EvaluationListComponent} from "./components/evaluation-list/evaluation-list.component";
import {AddGradeComponent} from "./components/add-grade/add-grade.component";
import {AddQaComponent} from "./components/add-qa/add-qa.component";
import {GradeListComponent} from "./components/grade-list/grade-list.component";
import {QaListComponent} from "./components/qa-list/qa-list.component";
import {PieChartComponent} from "@swimlane/ngx-charts";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {AddPublicationComponent} from "./components/publicationn/add-publication/add-publication.component";
import {
  RetrievePublicationComponent
} from "./components/publicationn/retrieve-publication/retrieve-publication.component";
import {DeletePublicationComponent} from "./components/publicationn/delete-publication/delete-publication.component";
import {ListPublicationComponent} from "./components/publicationn/list-publication/list-publication.component";
import {CommentComponent} from "./components/comments/comment/comment.component";
import {CoursComponent} from "./components/cours/cours.component";
import {CoursDetailsComponent} from "./components/cours-details/cours-details.component";
import {CoursUpdateComponent} from "./components/cours-update/cours-update.component";
import {UpdateContentComponent} from "./components/update-content/update-content.component";
import {ContenuCoursComponent} from "./components/contenu-cours/contenu-cours.component";
import {AddContenuComponent} from "./components/add-contenu/add-contenu.component";
import {ProfesseurnavComponent} from "./components/professeurnav/professeurnav.component";
import {
  InterfaceContenuEtudientComponent
} from "./components/interface-contenu-etudient/interface-contenu-etudient.component";
import {
  InterfaceCoursEtudientComponent
} from "./components/interface-cours-etudient/interface-cours-etudient.component";
import {FinalProfComponent} from "./final-prof/final-prof.component";
//import { AuthGuard } from './service/auth.guard';
//import  {AccountSettingsComponent} from "./components/account-settings/account-settings.component";
const routes: Routes = [

  { path: 'home', component: HomeComponent }, // Assurez-vous que HomeComponent est importé
  // Autres routes...
//mohamedddsnssjsss
  {path :'4',component:HomeComponent},

  { path: 'register', component: RegisterComponent},
  // { path: 'login', component: LoginComponentComponent},
  { path: 'ForgetPassword', component: ForgetPasswordComponent},
  { path: 'google-callback', component: GoogleCallbackComponent },

  { path: 'listUseur', component: UserListComponentComponent ,canActivate: [RoleGuardService], data: { roles: ['ADMINISTRATOR'] } },
  { path: 'login', component: LoginComponentComponent, canActivate: [AuthGardService] },
  { path: 'account-settings', component: AccountSettingsComponent, canActivate: [AuthGardService] },
  /* { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard] },
 //hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhgggggg
   { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [RoleGuard], data: { requiredRole: 'ADMIN' } }*/
  {path:'change-password',component:ChangePasswordComponent, canActivate: [ResetPasswordGuardService]},
//jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

  { path: 'specialite', component: SpecialiteComponent, canActivate: [RoleGuardService], data: { roles: ['ADMINISTRATOR'] } },
  { path: 'classe/:id', component: ClasseComponent, canActivate: [RoleGuardService], data: { roles: [ 'ADMINISTRATOR'] }  },
  { path: 'classe-list', component: ClasseListComponent , canActivate: [RoleGuardService], data: { roles: [ 'ADMINISTRATOR'] } },
  { path: 'list-specialite', component: ListSpecialiteComponent ,canActivate: [RoleGuardService], data: { roles: [ 'ADMINISTRATOR','TEACHER','STUDENT'] }},
  { path: 'show-classe-sp/:id', component: ShowClasseSpComponent ,canActivate: [RoleGuardService], data: { roles: [ 'ADMINISTRATOR'] }},
  { path: 'list-etudiant-by-claase/:idClasse', component: ListEtudiantByClaaseComponent,canActivate: [RoleGuardService], data: { roles: [ 'ADMINISTRATOR'] } },
  { path: 'list-ensignat-by-claase/:idClasse', component: ListEnsignatByClasseComponent,canActivate: [RoleGuardService], data: { roles: [ 'ADMINISTRATOR'] } },
  { path: 'list-etudiant-to-affect/:idClasse', component: ListEtudiantToAffComponent,canActivate: [RoleGuardService], data: { roles: [ 'ADMINISTRATOR'] } },
  { path: 'list-enseignat-to-aff/:idClasse', component: ListEnseignatToAffComponent,canActivate: [RoleGuardService], data: { roles: [ 'ADMINISTRATOR'] } },
  { path: 'statEtudiant', component: StatEtudiantParSpeComponent,canActivate: [RoleGuardService], data: { roles: [ 'ADMINISTRATOR'] } },
  { path: 'statEnseignat', component: StatProffParSpcComponent,canActivate: [RoleGuardService], data: { roles: [ 'ADMINISTRATOR'] } },


  //HAAAADIIIIIIIIIIIRRR
  { path: 'schedule', component: ScheduleComponent ,canActivate: [RoleGuardService], data: { roles: [ 'ADMINISTRATOR'] } },
  { path: 'emp/:id', component: EmploiComponent ,canActivate: [RoleGuardService], data: { roles: [ 'ADMINISTRATOR'] } },
  { path: 'ajouterEtoS/:idClasse', component: EngToShComponent,canActivate: [RoleGuardService], data: { roles: [ 'ADMINISTRATOR'] } },
  {path: 'ajouterSession/:idScheduel', component: SesionSchComponent,canActivate: [RoleGuardService], data: { roles: [ 'ADMINISTRATOR'] } },
  { path: 'Finalclass', component: FinalCLASSComponent , canActivate: [RoleGuardService], data: { roles: ['ADMINISTRATOR', 'STUDENT'] } },
  { path: 'SessionCLASS/:id', component: SessionCLASSComponent , canActivate: [RoleGuardService], data: { roles: ['ADMINISTRATOR', 'STUDENT'] } },
  { path: 'SessionPROF/:idScheduel', component: SessionPROFComponent , canActivate: [RoleGuardService], data: { roles: ['TEACHER', 'ADMINISTRATOR'] } },
  { path: 'EMPLOIT', component: FinalProfComponent , canActivate: [RoleGuardService], data: { roles: ['TEACHER', 'ADMINISTRATOR'] } },


  { path: 'specialitenavetudiant', component: NavEtudiantSpecComponent,canActivate: [RoleGuardService], data: { roles: [ 'ADMINISTRATOR','TEACHER','STUDENT'] }},




  { path: 'profnav', component: ProfesseurnavComponent,canActivate: [RoleGuardService], data: { roles: [ 'TEACHER'] }},



  { path: 'ss', component: SessionComponent },
  //{ path: 'modifS/:id', component: ModifscheduleComponent },




  { path: 'evaluation', component: EvaluationComponent},
  { path: 'evaluation-assessment/:idu/:ide', component: EvaluationAssessmentComponent},
  { path: 'add-evaluation', component: AddEvaluationComponent },
  { path: 'evaluation-details', component: EvaluationDetailsComponent,outlet:"backOffice" },
  { path: 'evaluation-list', component: EvaluationListComponent },
  { path: 'evaluations', component: EvaluationListComponent },
  { path: 'addGrade',component: AddGradeComponent},
  { path: 'addQa',component: AddQaComponent},
  { path: 'addQaBack',component: AddQaComponent,outlet:'back'},
  { path: 'grade-list',component: GradeListComponent},
  { path: 'qa-list',component: QaListComponent},
  { path: 'dashbord',component: DashboardComponent},

  { path: 'pieChart',component: PieChartComponent},


  { path: 'add-publication', component: AddPublicationComponent },
  { path: 'retrive-publication', component: RetrievePublicationComponent },
  { path: 'delete-publication', component: DeletePublicationComponent },
  { path: 'list', component: ListPublicationComponent },
  { path: 'comment', component: CommentComponent },
//testlel iptihel

  { path: 'addCours', component: CoursComponent, canActivate: [RoleGuardService], data: { roles: ['TEACHER', 'ADMINISTRATOR'] } },
  { path: 'coursDetails', component: CoursDetailsComponent, canActivate: [RoleGuardService], data: { roles: ['TEACHER', 'ADMINISTRATOR'] } },
  { path: 'coursUpdate/:id', component: CoursUpdateComponent, canActivate: [RoleGuardService], data: { roles: ['TEACHER', 'ADMINISTRATOR'] } },
  { path: 'contentUpdate/:id', component: UpdateContentComponent, canActivate: [RoleGuardService], data: { roles: ['TEACHER', 'ADMINISTRATOR'] } },
  { path: 'contenuCours', component: ContenuCoursComponent, canActivate: [RoleGuardService], data: { roles: ['TEACHER', 'ADMINISTRATOR'] } },
  { path: 'addContenu', component: AddContenuComponent, canActivate: [RoleGuardService], data: { roles: ['TEACHER', 'ADMINISTRATOR'] } },
  { path: 'coursEtudient', component: InterfaceCoursEtudientComponent, canActivate: [RoleGuardService], data: { roles: ['ADMINISTRATOR', 'STUDENT'] } },
  { path: 'contenuEtudient', component: InterfaceContenuEtudientComponent, canActivate: [RoleGuardService], data: { roles: ['ADMINISTRATOR', 'STUDENT'] } }
  //dddd

];
///

//
@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule]
})


export class AppRoutingModule{}


