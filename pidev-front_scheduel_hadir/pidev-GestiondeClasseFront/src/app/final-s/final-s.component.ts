import { Component, OnInit } from '@angular/core';
import { ScheduleServiceServiceService } from '../Service/schedule-service-service.service';
@Component({
  selector: 'app-final-s',
  templateUrl: './final-s.component.html',
  styleUrl: './final-s.component.scss'
})
export class FinalSComponent implements OnInit{
  hadirs: any[] = []; // This will store the schedules

  constructor(private scheduleService: ScheduleServiceServiceService) { }

  ngOnInit(): void {
    this.getAllSchedules();
    
  }

  getAllSchedules(): void {
    this.scheduleService.getAllSchedules().subscribe(
      data => {
        this.hadirs = data;
      },
      error => {
        console.error('Erreur lors de la récupération des horaires', error);
      }
    );
  }

}
