import { Component, OnInit } from '@angular/core';
import { ClasseService } from '../../Service/classe.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-classe',
  templateUrl: './edit-classe.component.html',
  styleUrls: ['./edit-classe.component.scss'] // Corrigé à styleUrls
})
export class EditClasseComponent implements OnInit {
  levels: any[] = [];
  classeId: any; // Pour stocker l'ID de la classe
classe:any[] = [];
  classeForm: FormGroup = this.formBuilder.group({
    nameClasse: ['', Validators.required],
    level: ['', Validators.required],
    universityDate: ['', Validators.required]
  });
  
  constructor(
    private classeService: ClasseService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute // Pour accéder aux paramètres de route
  ) {}

  ngOnInit(): void {
    this.classeId = this.route.snapshot.params['id'];
    this.createForm();
    this.loadLevels();
    this.loadClasseData(); // Charge les données existantes de la classe pour l'édition
  }

  createForm() {
    this.classeForm = this.formBuilder.group({
      nameClasse: ['', Validators.required],
      level: ['', Validators.required],
      universityDate: ['', Validators.required]
    });
  }

  // onSubmit() {
  //   if (this.classeForm.valid) {
  //     this.classeService.editClass(this.classeId, this.classeForm.value) // Assurez-vous que cette méthode correspond à celle définie dans le service
  //       .subscribe({
  //         next: (response) => {
  //           console.log('La classe a été modifiée avec succès:', response);
  //           // Gérer la réponse réussie, peut-être rediriger ou afficher un message de succès
  //         },
  //         error: (error) => {
  //           console.error('Erreur lors de la modification de la classe:', error);
  //           // Gérer l'erreur, afficher un message d'erreur à l'utilisateur
  //         }
  //       });
  //   } else {
  //     console.log('Le formulaire est invalide. Veuillez vérifier les champs.');
  //   }
  // }

  loadLevels() {
    this.classeService.getLevel().subscribe(
      data => {
        this.levels = data;
      },
      error => console.log('Erreur lors du chargement des classes', error)
    );
  }

  loadClasseData() {
    this.classeService.getObjetById(this.classeId) // Assurez-vous que cette méthode existe dans votre service
      .subscribe(
        data => {
          this.classeForm.patchValue(data); // Simplicité améliorée, assurez-vous que cela correspond à la structure de vos données
        },
        error => console.log('Erreur lors du chargement des données de la classe', error)
      );
  }



}
