import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEvaluationComponent } from './components/add-evaluation/add-evaluation.component';
import { EvaluationComponent } from './components/evaluation/evaluation.component';
import { HomeComponent } from './components/home/home.component';
import { DadminComponent } from './components/dadmin/dadmin.component';
import { AddPublicationComponent } from './components/publicationn/add-publication/add-publication.component';
import { SpecialiteComponent } from './components/specialite/specialite.component';
import { AddSpecialiterComponent } from './components/add-specialiter/add-specialiter.component';
import { ClasseComponent } from './components/classe/classe.component';
import { ClasseListComponent } from './components/classe-list/classe-list.component';
import { EditClasseComponent } from './components/edit-classe/edit-classe.component';
import { ListSpecialiteComponent } from './components/list-specialite/list-specialite.component';
import { ShowClasseSpComponent } from './components/show-classe-sp/show-classe-sp.component';
import { ListEtudiantByClaaseComponent } from './components/list-etudiant-by-claase/list-etudiant-by-claase.component';
import { ListEnsignatByClasseComponent } from './components/list-ensignat-by-classe/list-ensignat-by-classe.component';
import { ListEtudiantToAffComponent } from './components/list-etudiant-to-aff/list-etudiant-to-aff.component';
import { ListEnseignatToAffComponent } from './components/list-enseignat-to-aff/list-enseignat-to-aff.component';
import { StatEtudiantParSpeComponent } from "./components/stat-etudiant-par-spe/stat-etudiant-par-spe.component";
import { StatProffParSpcComponent } from "./components/stat-proff-par-spc/stat-proff-par-spc.component";
import { EngToShComponent } from './eng-to-sh/eng-to-sh.component';
import { SesionSchComponent } from './sesion-sch/sesion-sch.component';

import { SessionComponent } from './session/session.component';


import { EmploiComponent } from './emploi/emploi.component';
import { ScheduleComponent } from './schedule/schedule.component';


const routes: Routes = [

  { path: '', component: HomeComponent }, // Assurez-vous que HomeComponent est importé
  // Autres routes...

  { path: 'evaluation', component: EvaluationComponent },
  { path: 'add-evaluation', component: AddEvaluationComponent },
  { path: 'schedule', component: ScheduleComponent },
  { path: 'ss', component: SessionComponent },
  //{ path: 'modifS/:id', component: ModifscheduleComponent },
  { path: 'emp/:id', component: EmploiComponent },

  { path: 'dadmin', component: DadminComponent },
  { path: 'add-publication', component: AddPublicationComponent },
  { path: 'specialite', component: SpecialiteComponent },
  { path: 'add-specialiter', component: AddSpecialiterComponent },
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
  {
    path: 'ajouterSession/:idScheduel', component: SesionSchComponent
  },
  {
    path: 'edit-classe/:id', // Assuming you need an ID to edit a specific class
    component: EditClasseComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
