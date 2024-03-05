import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEvaluationComponent } from './components/add-evaluation/add-evaluation.component';
import { EvaluationComponent } from './components/evaluation/evaluation.component';
import { HomeComponent } from './components/home/home.component';
import { DadminComponent } from './components/dadmin/dadmin.component';
import { AddPublicationComponent } from './components/publicationn/add-publication/add-publication.component';
import { RetrievePublicationComponent } from './components/publicationn/retrieve-publication/retrieve-publication.component';
import { DeletePublicationComponent } from './components/publicationn/delete-publication/delete-publication.component';
import { ListPublicationComponent } from './components/publicationn/list-publication/list-publication.component';
import { CommentComponent } from './components/comments/comment/comment.component';


const routes: Routes = [
  
    { path: '', component: HomeComponent }, // Assurez-vous que HomeComponent est importé
    // Autres routes...
  
  { path: 'evaluation', component: EvaluationComponent },
  { path: 'add-evaluation', component: AddEvaluationComponent },
  { path: 'dadmin', component: DadminComponent },
  { path: 'add-publication', component: AddPublicationComponent },
  { path: 'retrive-publication', component: RetrievePublicationComponent },
  { path: 'delete-publication', component: DeletePublicationComponent },
  { path: 'list', component: ListPublicationComponent },
  { path: 'comment', component: CommentComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
