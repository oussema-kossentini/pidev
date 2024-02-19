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


const routes: Routes = [

    { path: '', component: HomeComponent }, // Assurez-vous que HomeComponent est importé
    // Autres routes...

  { path: 'evaluation', component: EvaluationComponent },
  { path: 'add-evaluation', component: AddEvaluationComponent },
  { path: 'dadmin', component: DadminComponent },
  { path: 'add-publication', component: AddPublicationComponent },
  { path: 'specialite', component: SpecialiteComponent },
  { path: 'add-specialiter', component: AddSpecialiterComponent},
  { path: 'register', component: RegisterComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
