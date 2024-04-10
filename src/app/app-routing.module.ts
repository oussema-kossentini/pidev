import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEvaluationComponent } from './components/add-evaluation/add-evaluation.component';
import { EvaluationComponent } from './components/evaluation/evaluation.component';
import { HomeComponent } from './components/home/home.component';
import { DadminComponent } from './components/dadmin/dadmin.component';
import { AddPublicationComponent } from './components/publicationn/add-publication/add-publication.component';
import { EvaluationListComponent } from './components/evaluation-list/evaluation-list.component';
import { AddGradeComponent } from './components/add-grade/add-grade.component';
import { AddQaComponent } from './components/add-qa/add-qa.component';
import { GradeListComponent } from './components/grade-list/grade-list.component';
import { QaListComponent } from './components/qa-list/qa-list.component';
import {EvaluationDetailsComponent} from "./components/evaluation/evaluation-details/evaluation-details.component";
import {EvaluationAssessmentComponent} from "./components/evaluation-assessment/evaluation-assessment.component";
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';



const routes: Routes = [

    { path: '', component: HomeComponent }, // Assurez-vous que HomeComponent est importé
    { path: 'home', component: HomeComponent }, // Assurez-vous que HomeComponent est importé
    // Autres routes...

  { path: 'evaluation', component: EvaluationComponent},
  { path: 'evaluation-assessment/:idu/:ide', component: EvaluationAssessmentComponent},
  { path: 'add-evaluation', component: AddEvaluationComponent },
  { path: 'evaluation-details', component: EvaluationDetailsComponent,outlet:"backOffice" },
  { path: 'dadmin', component: DadminComponent },
  { path: 'add-publication', component: AddPublicationComponent },
  { path: 'evaluation-list', component: EvaluationListComponent },
  { path: 'evaluations', component: EvaluationListComponent },
  { path: 'addGrade',component: AddGradeComponent},
  { path: 'addQa',component: AddQaComponent},
  { path: 'addQaBack',component: AddQaComponent,outlet:'back'},
  { path: 'grade-list',component: GradeListComponent},
  { path: 'qa-list',component: QaListComponent},
  { path: 'dashbord',component: DashboardComponent},
  { path: 'pieChart',component: PieChartComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
