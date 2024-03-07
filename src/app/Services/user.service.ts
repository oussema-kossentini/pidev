import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8081/api/users';
  constructor(private http: HttpClient) { }

  getAllUsers(){
    return this.http.get(this.apiUrl+"/retrieve-all-users")
  }

}
