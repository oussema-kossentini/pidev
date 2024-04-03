import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEvaluationComponent } from './components/add-evaluation/add-evaluation.component';
import { EvaluationComponent } from './components/evaluation/evaluation.component';
import { HomeComponent } from './components/home/home.component';
import { DadminComponent } from './components/dadmin/dadmin.component';
import { AddPublicationComponent } from './components/publicationn/add-publication/add-publication.component';
import { CoursComponent } from './components/cours/cours.component';
import { CoursDetailsComponent } from './components/cours-details/cours-details.component';
import { CoursUpdateComponent } from './components/cours-update/cours-update.component';
import { ContenuCoursComponent } from './components/contenu-cours/contenu-cours.component';
import { AddContenuComponent } from './components/add-contenu/add-contenu.component';
import { UpdateContentComponent } from './components/update-content/update-content.component';


const routes: Routes = [
  
    { path: '', component: HomeComponent }, // Assurez-vous que HomeComponent est importé
    // Autres routes...
  
  { path: 'evaluation', component: EvaluationComponent },
  { path: 'add-evaluation', component: AddEvaluationComponent },
  { path: 'dadmin', component: DadminComponent },
  { path: 'add-publication', component: AddPublicationComponent },
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
export class AppRoutingModule { }
