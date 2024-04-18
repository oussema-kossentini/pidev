
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ServiceFazzetregisterService } from '../../service/service-fazzetregister-service.service';
import { Router } from '@angular/router';
//import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-affecter-role',
  templateUrl: './affecter-role.component.html',
  styleUrl: './affecter-role.component.scss'
})
export class AffecterRoleComponent

  implements OnInit {
  form: FormGroup;
  users: any[] = [];
  roles: any[] = [];

  constructor(private fb: FormBuilder, private dataService: ServiceFazzetregisterService) {
    this.form = this.fb.group({
      userEmail: [''],
      userRole: ['']
    });
  }

  ngOnInit(): void {
    this.loadUsers();
    this.loadRoles();
  }

  loadUsers() {
    this.dataService.getUsers().pipe(
      catchError(error => {
        console.error('Error loading users', error);
        return of([]); // Return empty array or appropriate error handling
      })
    ).subscribe(data => {
      this.users = data;
    });
  }
  loadRoles() {
    this.dataService.getRoles().subscribe(data => {
      this.roles = data;
    });
  }

  assignRole() {
    const selectedEmail = this.form.get('userEmail')?.value;
    const selectedRole = this.form.get('userRole')?.value;
    this.dataService.affecterRole(selectedEmail, selectedRole).subscribe({
      next: (response) => {
        console.log('Role assigned', response);
        alert('Role successfully updated.'); // Simple alert; consider a more sophisticated method in production
      },
      error: (error) => {
        console.error('Failed to assign role', error);
        alert('Failed to update role.'); // Simple alert; consider a more sophisticated method in production
      }
    });
  }

}
