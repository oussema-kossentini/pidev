import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from  '@angular/common/http';
import { Comment } from "../components/comments/Comment";
import { Observable } from "rxjs";
import { ServiceFazzetregisterService } from './service-fazzetregister-service.service';
@Injectable({
  providedIn: 'root'
})
export class CommentService{
  private apiUrl = 'http://localhost:8085/courszello/api/comments';
  constructor(private http: HttpClient, private authService: ServiceFazzetregisterService){}
  addCommentToPublication(publicationId: string, comment: Comment): Observable<any> {
    return this.authService.requestWithToken('POST', `${this.apiUrl}/${publicationId}/comments`, comment);
  }

  // Obtenir tous les commentaires pour une publication spécifique
  getCommentsForPublication(publicationId: string): Observable<Comment[]> {
    return this.authService.requestWithToken('GET', `${this.apiUrl}/${publicationId}/comments`);
  }

  // Supprimer un commentaire spécifique
  removeComment(commentId: string): Observable<any> {
    return this.authService.requestWithToken('DELETE', `${this.apiUrl}/remove-comments/${commentId}`);
  }

  // Modifier un commentaire existant
  modifyComment(comment: Comment): Observable<any> {
    return this.authService.requestWithToken('PUT', `${this.apiUrl}/modify-comment`, comment);
  }

  // Obtenir une publication par son ID
  getPublicationById(id: string): Observable<any> {
    return this.authService.requestWithToken('GET', `${this.apiUrl}/get?publication-id=${id}`);
  }
}
