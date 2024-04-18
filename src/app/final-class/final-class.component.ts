import { Component ,OnInit} from '@angular/core';
import { ScheduleServiceServiceService } from '../Service/schedule-service-service.service';

@Component({
  selector: 'app-final-class',
  templateUrl: './final-class.component.html',
  styleUrl: './final-class.component.scss'
})
export class FinalCLASSComponent implements OnInit{
  hadirs: any[] = []; // This will store the schedules

  constructor(private scheduleService: ScheduleServiceServiceService) { }

  ngOnInit(): void {
    this.getSchedules();
    
  }

  getSchedules(): void {
    this.scheduleService.getAllSchedules() // Or any method you use to fetch schedules
      .subscribe(data => {
        this.hadirs = data;
        // Optionally, use localStorage as you did in EngToShComponent
      });
  }


}
