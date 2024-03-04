import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ServiceFazzetregisterService } from '../../service/service-fazzetregister-service.service';
import { NgModule } from '@angular/core';
import { FormsModule,FormBuilder } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-user-list-component',
  templateUrl: './user-list-component.component.html',
  styleUrls: ['./user-list-component.component.scss']
})

export class UserListComponentComponent implements OnInit {
  users: any[] = [];

  constructor(private userService: ServiceFazzetregisterService, private formBuilder: FormBuilder) { this.loadU();  }




  ngOnInit(): void {
 //  this.loadUsers();
    this.loadU();
  }

  // loadUsers(): void {
  //   this.userService.getUsers().subscribe(users => {
  //     this.users = users;
  //   });
  // }


  loadU() {
    this.userService.getUsers().subscribe(
      data => {
        this.users = data;
        console.log(this.users);
      },

    );
  }


  editUser(user: any): void {
    user.editing = true; // Activate edit mode for the user
  }

  saveChanges(user: any): void {
    user.editing = false; // Deactivate edit mode for the user
    this.userService.modifyUser(user).subscribe({
      next: (response) => {
        console.log('User modified successfully:', response);
        // Handle successful response, e.g., display confirmation message
      },
      error: (error) => {
        console.error('Error modifying user:', error);
        // Handle error, e.g., display error message to user
      }
    });
  }

 /* deleteUsers(userId: string): void {
    this.userService.removeUser(userId).subscribe({
      next: () => {
        console.log('User deleted successfully');
        // Reload users after deletion
        this.loadUsers();
      },
      error: (error) => {
        console.error('Error deleting user:', error);
        // Handle error, e.g., display error message to user
      }
    });
  }*/


 removeUser(id: string) {
    this.userService.removeUser(id).subscribe({
    next: () => {
      console.log('User deleted successfully');
      this.loadU(); // Or handle refresh differently
    },
    error: (error) => {
      console.error('Error deleting user:', error);
      // Display error message to user
    },
  });
  }

/*removeUser(userId: string) {
  console.log("Tentative de suppression de l'utilisateur avec l'ID :", userId);

  // Trouver l'utilisateur dans la liste des utilisateurs
  const user = this.users.find(u => u.idUser === userId);
  console.log("Objet utilisateur :", user);

  this.userService.removeUser(userId).subscribe({
    next: () => {
      console.log('User deleted successfully');
      this.loadU();
    },
    error: (error) => {
      console.error('Error deleting user:', error);
    },
  });
}
*/


}
