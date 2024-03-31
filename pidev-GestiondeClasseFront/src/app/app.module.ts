import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { CoursComponent } from './components/cours/cours.component';

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
import { DadminComponent } from './components/dadmin/dadmin.component';
import { AddPublicationComponent } from './components/publicationn/add-publication/add-publication.component';
import { AddSpecialiterComponent } from './components/add-specialiter/add-specialiter.component';
import { DashbordlatbarComponent } from './components/dashbordlatbar/dashbordlatbar.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { ClasseListComponent } from './components/classe-list/classe-list.component';
import { EditClasseComponent } from './components/edit-classe/edit-classe.component';
import { AccumulationChartModule, ChartModule, PieSeriesService } from '@syncfusion/ej2-angular-charts';



import { DropdownModule } from 'primeng/dropdown';
import { ListSpecialiteComponent } from './components/list-specialite/list-specialite.component';
import { ShowClasseSpComponent } from './components/show-classe-sp/show-classe-sp.component';
import { ListEnsignatByClasseComponent } from './components/list-ensignat-by-classe/list-ensignat-by-classe.component';
import { ListEtudiantByClaaseComponent } from './components/list-etudiant-by-claase/list-etudiant-by-claase.component';
import { ListEtudiantToAffComponent } from './components/list-etudiant-to-aff/list-etudiant-to-aff.component';
import { ListEnseignatToAffComponent } from './components/list-enseignat-to-aff/list-enseignat-to-aff.component';
import { StatEtudiantParSpeComponent } from './components/stat-etudiant-par-spe/stat-etudiant-par-spe.component';
import { StatProffParSpcComponent } from './components/stat-proff-par-spc/stat-proff-par-spc.component';
import { EngToShComponent } from './eng-to-sh/eng-to-sh.component';
import { SesionSchComponent } from './sesion-sch/sesion-sch.component';
import { SessionComponent } from './session/session.component';

import { EmploiComponent } from './emploi/emploi.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ModifscheduleComponent } from './modifschedule/modifschedule.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    CoursComponent,
 
    EvaluationComponent,
    ClasseComponent,
    SpecialiteComponent,
    PublicationComponent,
    RegisterComponent,
    AddEvaluationComponent,
    DadminComponent,
    AddPublicationComponent,
    AddSpecialiterComponent,
    DashbordlatbarComponent,
    ClasseListComponent,
    EditClasseComponent,
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


  ],
  imports: [
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
    ChartModule


  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    PieSeriesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
