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
  selectedFile: File | null = null;
  constructor(private userService: ServiceFazzetregisterService, private formBuilder: FormBuilder) { this.loadU();  }




  ngOnInit(): void {
 //  this.loadUsers();
    this.loadU();
  }
  onFileSelected(event: Event, user: any): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.selectedFile = input.files[0];
      user.selectedFile = this.selectedFile; // Assign the selected file to the specific user
    }
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

    const formData = new FormData();
    formData.append('userJson', JSON.stringify(user));

    // Assurez-vous que le nom de l'attribut pour le fichier correspond à celui attendu par votre API.
    // Dans l'exemple du contrôleur Spring, nous avons utilisé "image" comme paramètre pour le fichier.
    // Changez "profilePicture" en "image" si c'est ce que votre backend s'attend à recevoir.
    if (user.selectedFile) {
      formData.append('image', user.selectedFile, user.selectedFile.name);
    }

    // L'ID de l'utilisateur doit être inclus dans l'URL, pas dans le FormData,
    // assurez-vous que l'URL est correcte et correspond à celle définie dans votre contrôleur Spring.
    this.userService.modifyUser(user.idUser, user, user.selectedFile).subscribe({
      next: (response: any) => {
        console.log('User modified successfully:', response);
        // Handle successful response, e.g., display confirmation message
        // Optionally, refresh the user list or update the UI to reflect the changes
        this.loadU(); // Assuming you have a method loadU() to refresh the list of users
      },
      error: (error: any) => {
        console.error('Error modifying user:', error);
        // Handle error, e.g., display error message to user
      }
    });
  }




  selectProfilePicture(user: any): void {
    // Simplement, pour l'instant, affichez une alerte lorsque le bouton est cliqué
    alert("Functionality to select profile picture will be implemented here.");
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
