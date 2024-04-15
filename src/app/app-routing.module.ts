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
import {EngToShComponent} from "./eng-to-sh/eng-to-sh.component";
import {FinalSComponent} from "./final-s/final-s.component";
import {FinalCLASSComponent} from "./final-class/final-class.component";
import {SessionCLASSComponent} from "./session-class/session-class.component";
import {SessionPROFComponent} from "./session-prof/session-prof.component";
import {NavEtudiantSpecComponent} from "./components/nav-etudiant-spec/nav-etudiant-spec.component";
import {SesionSchComponent} from "./sesion-sch/sesion-sch.component";
import {ScheduleComponent} from "./schedule/schedule.component";
import {SessionComponent} from "./session/session.component";
import {EmploiComponent} from "./emploi/emploi.component";
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
//import { AuthGuard } from './service/auth.guard';
//import  {AccountSettingsComponent} from "./components/account-settings/account-settings.component";
const routes: Routes = [

   { path: 'home', component: HomeComponent }, // Assurez-vous que HomeComponent est importé
    // Autres routes...

  {path :'4',component:HomeComponent},

  { path: 'register', component: RegisterComponent},
 // { path: 'login', component: LoginComponentComponent},
  { path: 'ForgetPassword', component: ForgetPasswordComponent},
  { path: 'google-callback', component: GoogleCallbackComponent },

  { path: 'listUseur', component: UserListComponentComponent ,canActivate: [RoleGuardService], data: { requiredRole:'ADMINISTRATOR'} },
  { path: 'login', component: LoginComponentComponent, canActivate: [AuthGardService] },
  { path: 'account-settings', component: AccountSettingsComponent, canActivate: [AuthGardService] },
 /* { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard] },

  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [RoleGuard], data: { requiredRole: 'ADMIN' } }*/
{path:'change-password',component:ChangePasswordComponent, canActivate: [ResetPasswordGuardService]},


  { path: 'specialite', component: SpecialiteComponent },
  { path: 'classe/:id', component: ClasseComponent },
  { path: 'classe-list', component: ClasseListComponent },
  { path: 'list-specialite', component: ListSpecialiteComponent },
  { path: 'show-classe-sp/:id', component: ShowClasseSpComponent },
  { path: 'list-etudiant-by-claase/:idClasse', component: ListEtudiantByClaaseComponent },
  { path: 'list-ensignat-by-claase/:idClasse', component: ListEnsignatByClasseComponent },
  { path: 'list-etudiant-to-affect/:idClasse', component: ListEtudiantToAffComponent },
  { path: 'list-enseignat-to-aff/:idClasse', component: ListEnseignatToAffComponent },
  { path: 'statEtudiant', component: StatEtudiantParSpeComponent },
  { path: 'statEnseignat', component: StatProffParSpcComponent },
  { path: 'ajouterEtoS/:idClasse', component: EngToShComponent },
  { path: 'EMPLOIT', component: FinalSComponent },
  { path: 'Finalclass', component: FinalCLASSComponent },
  { path: 'SessionCLASS/:id', component: SessionCLASSComponent },
  { path: 'SessionPROF/:idScheduel', component: SessionPROFComponent },
  { path: 'specialitenavetudiant', component: NavEtudiantSpecComponent},
  {
    path: 'ajouterSession/:idScheduel', component: SesionSchComponent
  },

  { path: 'schedule', component: ScheduleComponent },
  { path: 'ss', component: SessionComponent },
  //{ path: 'modifS/:id', component: ModifscheduleComponent },
  { path: 'emp/:id', component: EmploiComponent },



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

  { path: 'addCours', component: CoursComponent },
  { path: 'coursDetails', component: CoursDetailsComponent },
  { path: 'coursUpdate/:id', component: CoursUpdateComponent },
  { path: 'contentUpdate/:id', component: UpdateContentComponent },
  { path: 'contenuCours', component: ContenuCoursComponent },
  { path: 'addContenu', component: AddContenuComponent }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule]
})


export class AppRoutingModule{}

