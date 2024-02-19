import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-specialite',
  templateUrl: './specialite.component.html',
  styleUrl: './specialite.component.scss'
})
export class SpecialiteComponent {
  specialiteForm = new FormGroup({
    id: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });

  onSubmit() {
    // Submit the form data to the backend or service
    console.log(this.specialiteForm.value);
  }
}
