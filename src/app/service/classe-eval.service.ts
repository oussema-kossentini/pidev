import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { ServiceFazzetregisterService } from './service-fazzetregister-service.service';

//touched
@Injectable({
  providedIn: 'root'
})
export class ClasseEvalService {
  private apiUrl = 'http://localhost:8085/courszello/api/classes/retrieve-all-classes';

  constructor(private http: HttpClient, private authService: ServiceFazzetregisterService) { }

  getAllClasses(): Observable<any[]> {
    return this.authService.requestWithToken('GET', this.apiUrl);
  }
}
