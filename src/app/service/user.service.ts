import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { ServiceFazzetregisterService } from './service-fazzetregister-service.service';
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8085/courszello/api/users';
  constructor(private http: HttpClient, private authService: ServiceFazzetregisterService) {}

  getAllUsers(): Observable<any[]> {
    const url = `${this.apiUrl}/retrieve-all-users`;
    return this.authService.requestWithToken('GET', url);
  }
}
