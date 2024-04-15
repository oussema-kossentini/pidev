import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import { SpecialiteService } from '../../service/specialite.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from "@angular/common/http";
import {AbstractControl, FormBuilder, ValidatorFn, Validators} from "@angular/forms";
import { ServiceFazzetregisterService } from '../../service/service-fazzetregister-service.service';
import { isPlatformBrowser } from '@angular/common';

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
  isBrowser :Boolean;

  constructor(
    private specialiteService: SpecialiteService,
    public authService: ServiceFazzetregisterService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private formBuilder: FormBuilder,
    private router: Router
  ) {



    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    //this.loadTitles();
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

  onSubmit(): void {alert('');
    // Reset alertMessage each time form is submitted
    token=thqi
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
