import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { SpecialiteService } from '../../Service/specialite.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: 'app-specialite',
  templateUrl: './specialite.component.html',
  styleUrls: ['./specialite.component.scss']
})
export class SpecialiteComponent implements OnInit {
  titles: string[] = [];
  specialiteForm: any;
  errorMessage: string | null = null;
  forbiddenTitle : any;
  alertMessage: string | null = null; // Add this line


  constructor(
    private specialiteService: SpecialiteService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTitles();
  }

  loadTitles(): void {
    this.specialiteService.getAllTitles().subscribe({
      next: (data: string[]) => {
        this.titles = data;
        this.initializeForm();
      },
      error: (error: HttpErrorResponse) => {
        this.handleError(error);
      }
    });
  }

  initializeForm(): void {
    this.specialiteForm = this.formBuilder.group({
      title: ['', [Validators.required, this.forbiddenTitleValidator(this.titles)]],
      description: ['', Validators.required]
    });
  }

  onSubmit(): void {
    // Reset alertMessage each time form is submitted
    this.alertMessage = null;

    // Check for the forbiddenTitle error specifically
    const titleControl = this.specialiteForm.get('title');
    if (titleControl.errors?.forbiddenTitle) {
      // Set the alert message
      this.alertMessage = titleControl.errors.forbiddenTitle.message;
      return; // Stop the form submission process
    }

    if (this.specialiteForm.valid) {
      this.specialiteService.addspecialite(this.specialiteForm.value).subscribe({
        next: (response) => {
          console.log('La spécialité a été créée avec succès:', response);
          this.router.navigate(['/list-specialite']);
        },
        error: (error: HttpErrorResponse) => {
          this.handleError(error);
        }
      });
    }
  }

  forbiddenTitleValidator(titles: string[]): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const forbidden = titles.includes(control.value);
      return forbidden ? { 'forbiddenTitle': { value: control.value, message: 'This title already exists.' } } : null;
    };
  }


  handleError(error: HttpErrorResponse): void {
    this.errorMessage = 'Une erreur s\'est produite: ' + error.message;
    console.error(this.errorMessage);
  }
}
