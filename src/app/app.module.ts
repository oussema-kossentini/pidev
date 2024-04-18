import { NgModule,NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
//import { JwtHelperService } from '@auth0/angular-jwt';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegisterComponent } from './components/register/register.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { DashbordlatbarComponent } from './components/dashbordlatbar/dashbordlatbar.component';
import {InputTextModule} from 'primeng/inputtext';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule, HTTP_INTERCEPTORS, withFetch } from '@angular/common/http';
import { LoginComponentComponent } from './components/login-component/login-component.component';
//import { ListuseruComponentComponent } from './components/listuseru-component/listuseru-component.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
//import { NgxPasswordStrengthModule } from 'ngx-password-strength';
//import{ListuseruComponentComponent}from'./components/user-list-component/user-list-component.component;
import { UserListComponentComponent } from './components/user-list-component/user-list-component.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { AuthInterceptorService } from './service/auth-interceptor.service';
import { GoogleCallbackComponent } from './components/google-callback/google-callback.component';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';
///import { withFetch } from '@angular/common/http';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { TabsModule } from 'ngx-bootstrap/tabs';
import {ClasseComponent} from "./components/classe/classe.component";
import {SpecialiteComponent} from "./components/specialite/specialite.component";
import {ClasseListComponent} from "./components/classe-list/classe-list.component";
import {ListSpecialiteComponent} from "./components/list-specialite/list-specialite.component";
import {ShowClasseSpComponent} from "./components/show-classe-sp/show-classe-sp.component";
import {ListEnsignatByClasseComponent} from "./components/list-ensignat-by-classe/list-ensignat-by-classe.component";
import {ListEtudiantByClaaseComponent} from "./components/list-etudiant-by-claase/list-etudiant-by-claase.component";
import {ListEtudiantToAffComponent} from "./components/list-etudiant-to-aff/list-etudiant-to-aff.component";
import {ListEnseignatToAffComponent} from "./components/list-enseignat-to-aff/list-enseignat-to-aff.component";
import {StatEtudiantParSpeComponent} from "./components/stat-etudiant-par-spe/stat-etudiant-par-spe.component";
import {StatProffParSpcComponent} from "./components/stat-proff-par-spc/stat-proff-par-spc.component";
import {EngToShComponent} from "./components/eng-to-sh/eng-to-sh.component";
import {SesionSchComponent} from "./components/sesion-sch/sesion-sch.component";
import {SessionComponent} from "./components/session/session.component";
import {EmploiComponent} from "./components/emploi/emploi.component";
import {ScheduleComponent} from "./components/schedule/schedule.component";
import {ModifscheduleComponent} from "./components/modifschedule/modifschedule.component";
import {FinalSComponent} from "./components/final-s/final-s.component";
import {FinalCLASSComponent} from "./components/final-class/final-class.component";
import {SessionCLASSComponent} from "./components/session-class/session-class.component";
import {SessionPROFComponent} from "./components/session-prof/session-prof.component";
import {NavEtudiantSpecComponent} from "./components/nav-etudiant-spec/nav-etudiant-spec.component";
import {ChartModule} from "primeng/chart";
import {TableModule} from "primeng/table";
import {DropdownModule} from "primeng/dropdown";
import {AccumulationChartModule} from "@syncfusion/ej2-angular-charts";
import {EvaluationListComponent} from "./components/evaluation-list/evaluation-list.component";
import {AddGradeComponent} from "./components/add-grade/add-grade.component";
import {AddQaComponent} from "./components/add-qa/add-qa.component";
import {GradeListComponent} from "./components/grade-list/grade-list.component";
import {QaListComponent} from "./components/qa-list/qa-list.component";
import {EvaluationDetailsComponent} from "./components/evaluation/evaluation-details/evaluation-details.component";
import {EvaluationAssessmentComponent} from "./components/evaluation-assessment/evaluation-assessment.component";
import {UsersListComponent} from "./components/users-list/users-list.component";
import {EvaluationAssignComponent} from "./components/evaluation-assign/evaluation-assign.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {PieChartComponent} from "./components/pie-chart/pie-chart.component";
import {BarChartComponent} from "./components/bar-chart/bar-chart.component";
import {CardChartComponent} from "./components/card-chart/card-chart.component";
import {LineChartComponent} from "./components/line-chart/line-chart.component";
import {MatCardModule} from "@angular/material/card";
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatRadioModule} from "@angular/material/radio";
import {MatDividerModule} from "@angular/material/divider";
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {EvaluationComponent} from "./components/evaluation/evaluation.component";
import {AddEvaluationComponent} from "./components/add-evaluation/add-evaluation.component";
import {AddPublicationComponent} from "./components/publicationn/add-publication/add-publication.component";
import {
  RetrievePublicationComponent
} from "./components/publicationn/retrieve-publication/retrieve-publication.component";
import {DeletePublicationComponent} from "./components/publicationn/delete-publication/delete-publication.component";
import {ListPublicationComponent} from "./components/publicationn/list-publication/list-publication.component";
import {FouterComponent} from "./components/publicationn/fouter/fouter.component";
import {CommentComponent} from "./components/comments/comment/comment.component";
import {CalendarModule} from "primeng/calendar";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatListModule} from "@angular/material/list";
import {MenubarModule} from "primeng/menubar";
import {AvatarModule} from "primeng/avatar";
import {CoursComponent} from "./components/cours/cours.component";
import {CoursDetailsComponent} from "./components/cours-details/cours-details.component";
import {CoursUpdateComponent} from "./components/cours-update/cours-update.component";
import {ContenuCoursComponent} from "./components/contenu-cours/contenu-cours.component";
import {AddContenuComponent} from "./components/add-contenu/add-contenu.component";
import {UpdateContentComponent} from "./components/update-content/update-content.component";
import {
  InterfaceCoursEtudientComponent
} from "./components/interface-cours-etudient/interface-cours-etudient.component";
import {
  InterfaceContenuEtudientComponent
} from "./components/interface-contenu-etudient/interface-contenu-etudient.component";
import {ProfesseurnavComponent} from "./components/professeurnav/professeurnav.component";
//
//import{user}
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,





      RegisterComponent,



      DashbordlatbarComponent,
      LoginComponentComponent,
      UserListComponentComponent,
    //  ListuseruComponentComponent,
      ForgetPasswordComponent,
      ChangePasswordComponent,
      GoogleCallbackComponent,
      AccountSettingsComponent,

    ClasseComponent,
    SpecialiteComponent,
    ClasseListComponent,

    ListSpecialiteComponent,
    ShowClasseSpComponent,
    ListEnsignatByClasseComponent,
    ListEtudiantByClaaseComponent,
    ListEtudiantToAffComponent,
    ListEnseignatToAffComponent,
    StatEtudiantParSpeComponent,
    StatProffParSpcComponent,
    EngToShComponent,
    SesionSchComponent,
    SessionComponent,

    EmploiComponent,
    ScheduleComponent,
    ModifscheduleComponent,
    FinalSComponent,
    FinalCLASSComponent,
    SessionCLASSComponent,
    SessionPROFComponent,
    NavEtudiantSpecComponent,

    EvaluationComponent,
    AddEvaluationComponent,
    EvaluationListComponent,
    AddGradeComponent,
    AddQaComponent,
    GradeListComponent,
    QaListComponent,
    EvaluationDetailsComponent,
    EvaluationAssessmentComponent,
    UsersListComponent,
    EvaluationAssignComponent,
    DashboardComponent,
    PieChartComponent,
    BarChartComponent,
    CardChartComponent,
    LineChartComponent,
    EvaluationDetailsComponent,



    AddPublicationComponent,
    RetrievePublicationComponent,
    DeletePublicationComponent,
    ListPublicationComponent,
    FouterComponent,
    CommentComponent,


    CoursComponent,
    CoursDetailsComponent,
    CoursUpdateComponent,
    ContenuCoursComponent,
    AddContenuComponent,
    UpdateContentComponent,
    InterfaceCoursEtudientComponent,
    InterfaceContenuEtudientComponent,

    ProfesseurnavComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    TabsModule.forRoot(),

    HttpClientModule, // Utilisez withFetch() ici
    //HttpClientModule,
   // BrowserModule.withServerTransition({ appId: 'serverApp' }),
    //NgxPasswordStrengthModule,
    SocialLoginModule,
    AppRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
NgxCaptchaModule,
    FormsModule,
    AccumulationChartModule,
    BrowserModule,
    AppRoutingModule,
    ChartModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    HttpClientModule,
    TableModule,
    DropdownModule,
    ChartModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    HttpClientModule,
    MatButtonToggleModule,
    MatRadioModule,
    MatDividerModule,
    NgxChartsModule,



    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    ButtonModule,
    CalendarModule,
    FormsModule ,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    HttpClientModule,
    MatGridListModule,
    MatListModule,
    MenubarModule,
    ButtonModule,
    AvatarModule,

    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule

  ],
  providers: [
    provideClientHydration(),

    provideClientHydration(),
    provideAnimationsAsync(),
   // PieSeriesService,
   {provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true,},
    provideAnimationsAsync(),
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('896713448835-jmsg22uggotbi02tm66voprbv75ruqih.apps.googleusercontent.com')
          }
        ]
      } as SocialAuthServiceConfig,
    }

    // { provide: HTTP_INTERCEPTORS, useClass: provideHttpClient(), multi: true }
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})


export class AppModule { }
