import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

// Assuming UserService is correctly located in your service directory
//import { UserService } from '../../service/user.service';
import { ServiceFazzetregisterService } from '../../service/service-fazzetregister-service.service';
@Component({
  selector: 'app-banuser',
  templateUrl: './banuser.component.html',
  styleUrls: ['./banuser.component.scss'] // Corrected styleUrl to styleUrls and ensure the file extension matches your actual stylesheet
})
export class BanuserComponent implements OnInit {
  form: FormGroup;
  users: any[] = []; // Replace 'any' with the actual type if known for better type safety

  constructor(private fb: FormBuilder, private userService: ServiceFazzetregisterService) {
    // Initialize form controls within the constructor
    this.form = this.fb.group({
      userEmail: ['', Validators.required],
      userStatus: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadUsers();
    //this.loadRoles();
  }

 // x:any[] =[];


  loadUsers() {
    this.userService.getUsers().pipe(
      catchError(error => {
        console.error('Error loading users', error);
        return of([]); // Return empty array or appropriate error handling
      })
    ).subscribe(data => {
      this.users = data;
    });
  }
  updateBanStatus(): void {
    if (this.form && this.form.value) { // Ensure form and form.value are not null
      const userEmail = this.form.value.userEmail;
      const userStatus = this.form.value.userStatus;
      if (userEmail && userStatus !== undefined) {  // Check that both userEmail and userStatus are not undefined
        this.userService.updateBanStatus(userEmail, userStatus).subscribe({
          next: (response) => console.log('Status updated successfully', response),
          error: (error) => console.error('Failed to update status', error)
        });
      } else {
        console.error('User email or status is missing');
      }
    } else {
      console.error('Form is not fully initialized');
    }
  }

}
