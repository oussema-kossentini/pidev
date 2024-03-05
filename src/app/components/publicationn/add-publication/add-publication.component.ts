import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import AOS from 'aos';
import { PublicationService } from '../publication.service';
import {  Publication } from '../publication.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-publication',
  templateUrl: './add-publication.component.html',
  styleUrls: ['./add-publication.component.scss']
})
export class AddPublicationComponent implements OnInit {
  
publicationForm!: FormGroup;
  fileNames: string[] = [];
  fileUrl: string | undefined; // Déclaration de la propriété fileUrl

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  
  
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private publicationService: PublicationService,
    private router: Router // Injection du Router

  ) {}

  ngOnInit() {
    this.publicationForm = this.fb.group({
      content: ['', Validators.required],
      title:['', Validators.required],
      file: [null] // Ajoutez un champ pour le fichier, initialisé à null

      
      
    });
    this.publicationService.dataForm = this.publicationForm; // Initialiser dataForm dans le service

  }
  get f() { return this.publicationService.dataForm.controls; }
  addData() {
    const formData = new FormData();
    const publication = this.publicationService.dataForm.value;
    formData.append('publication', JSON.stringify(publication));
    formData.append('file', this.userFile);
    this.publicationService.createData(formData).subscribe(data => {
      // La navigation vers une autre URL est retirée
    });
  }
  
  userFile: any ;
  public message!: string;
  imgURL: any;
  public imagePath: any;

  onSelectedFile(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0)
    {
      const file = inputElement.files[0];
      this.userFile = file;
      // this.f['profile'].setValue(file);
 
      var mimeType = file.type;
      if (mimeType.match(/image\/*/) == null) {
        this.message = "Only images are supported.";
        return;
      }
 
      var reader = new FileReader();
    
      this.imagePath = file;
      reader.readAsDataURL(file); 
      reader.onload = (_event) => { 
        this.imgURL = reader.result as string; 
      }
    }
}





  showEmojis = false;
  content = '';
  emojis = ['😀', '😂', '👍', '🚀', '💻', '🎉', '❤️']; // Liste d'exemple
title='';


toggleEmojis() {
  this.showEmojis = !this.showEmojis; // Inverse la valeur de showEmojis pour afficher ou masquer la liste
}


  addEmoji(emoji: string) {
    const contentControl = this.publicationForm.get('content');
    const currentContent = contentControl?.value || ''; // Obtenez la valeur actuelle du contenu
    contentControl?.setValue(currentContent + emoji); // Ajoutez l'emoji à la valeur existante
    this.toggleEmojis(); //Fermer la liste d'emojis après un choix

  }
  PublicationList: Publication[] = [];

  publish(): void {
    if (this.publicationForm.valid ) {
      const publicationData: Publication = {
        content: this.publicationForm.value.content,
        title: this.publicationForm.value.title,
        creationDate: new Date() // Utiliser la date actuelle comme date de création
      };
  
      // Vérifier si un fichier a été sélectionné
      if (this.userFile) {
        const formData = new FormData();
        formData.append('publication', JSON.stringify(publicationData));
        formData.append('file', this.userFile);
  
        // Envoyer l'objet Publication et le fichier au service de publication
        this.publicationService.createData(formData).subscribe({
          next: () => {
            // Ajouter la nouvelle publication à PublicationList
            this.PublicationList.push(publicationData);
            
            this.snackBar.open('Publication ajoutée avec succès', 'Fermer', {
              duration: 6000,
              panelClass: ['success-snackbar'],
              horizontalPosition: 'right',
              verticalPosition: 'top',
            });
            this.publicationForm.reset();
          },
          error: (err) => console.error(err)
        });
      } else {
        console.error('Aucun fichier sélectionné');
      }
    } else {
      this.snackBar.open('Veuillez remplir tous les champs du formulaire', 'Fermer', {
        duration: 3000,
        panelClass: ['error-snackbar'],
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
    }
  }
  
  imageUrls:string[]=[];



   removeImages(i:number) {
      this.imageUrls.splice(i, 1);
   
    }
    
   
  

    triggerFileInputClick() {
      this.fileInput.nativeElement.click();
    }
   
  }
