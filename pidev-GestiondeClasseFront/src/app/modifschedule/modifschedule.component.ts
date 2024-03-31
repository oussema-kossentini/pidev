import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ScheduleServiceServiceService } from '../Service/schedule-service-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modifschedule',
  templateUrl: './modifschedule.component.html',
  styleUrls: ['./modifschedule.component.scss']
})
export class ModifscheduleComponent implements OnInit {

  registerFormCustom!: FormGroup;
  id: any;

  constructor(private fb: FormBuilder,
    private scheduleServiceService: ScheduleServiceServiceService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.registerFormCustom = this.fb.group({
      title: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', [Validators.required, this.validateEndDate]]
    });

    // Récupérer l'ID de l'URL du navigateur
    this.id = this.route.snapshot.paramMap.get('id');

    // Récupérer l'élément de l'horaire à modifier et pré-remplir le formulaire
    this.scheduleServiceService.getByIdScheduel(this.id).subscribe((schedule) => {
      this.registerFormCustom.patchValue({
        title: schedule.title,
        startDate: schedule.startDate,
        endDate: schedule.endDate
      });
    });
  }
  // Validation personnalisée pour endDate
  validateEndDate(control: any): { [key: string]: any } | null {
    const startDate = control.parent?.get('startDate')?.value;
    const endDate = control.value;
    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      return { 'endDateBeforeStartDate': true };
    }
    return null;
  }

  modifier() {
    if (this.registerFormCustom.invalid) {
      return;
    }

    const formData = this.registerFormCustom.value;

    console.log("Données du formulaire", formData);
    console.log("ID", this.id);

    // Mettre à jour l'horaire avec les nouvelles données
    this.scheduleServiceService.update(this.id, formData).subscribe(() => {
      console.log('La modification a été appliquée avec succès.');
      this.registerFormCustom.reset();
      this.router.navigate(['/schedule']);
    }, error => {
      console.error('Une erreur s\'est produite lors de l\'application de la modification :', error);
    });
  }

}