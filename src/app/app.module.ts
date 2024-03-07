import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { CoursComponent } from './components/cours/cours.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { EvaluationComponent } from './components/evaluation/evaluation.component';
import { ClasseComponent } from './components/classe/classe.component';
import { SpecialiteComponent } from './components/specialite/specialite.component';
import { PublicationComponent } from './components/publication/publication.component';
import { RegisterComponent } from './components/register/register.component';
import { AddEvaluationComponent } from './components/add-evaluation/add-evaluation.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DadminComponent } from './components/dadmin/dadmin.component';
import { AddPublicationComponent } from './components/publicationn/add-publication/add-publication.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { EvaluationListComponent } from './components/evaluation-list/evaluation-list.component';
import { AddGradeComponent } from './components/add-grade/add-grade.component';
import { AddQaComponent } from './components/add-qa/add-qa.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { GradeListComponent } from './components/grade-list/grade-list.component';
import { QaListComponent } from './components/qa-list/qa-list.component';
import { EvaluationDetailsComponent } from './components/evaluation/evaluation-details/evaluation-details.component';
import { EvaluationAssessmentComponent } from './components/evaluation-assessment/evaluation-assessment.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { EvaluationAssignComponent } from './components/evaluation-assign/evaluation-assign.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,

    CoursComponent,
      ScheduleComponent,
      EvaluationComponent,
      ClasseComponent,
      SpecialiteComponent,
      PublicationComponent,
      RegisterComponent,
      AddEvaluationComponent,
      DadminComponent,
      AddPublicationComponent,
      EvaluationListComponent,
      AddGradeComponent,
      AddQaComponent,
      GradeListComponent,
      QaListComponent,
      EvaluationDetailsComponent,
      EvaluationAssessmentComponent,
      UsersListComponent,
      EvaluationAssignComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
    MatDividerModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
