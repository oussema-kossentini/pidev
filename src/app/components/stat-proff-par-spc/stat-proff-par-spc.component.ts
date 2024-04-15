import {Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import {SpecialiteService} from "../../service/specialite.service";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {isPlatformBrowser} from "@angular/common";
import Chart from "chart.js/auto";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-stat-proff-par-spc',
  templateUrl: './stat-proff-par-spc.component.html',
  styleUrl: './stat-proff-par-spc.component.scss'
})
export class StatProffParSpcComponent implements OnInit {
  @ViewChild('verticalChart') verticalChart!: ElementRef<HTMLCanvasElement>;

  MapList : any ;
  errorMessage: any;
  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              private specialiteService:SpecialiteService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router:Router
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.createChart();
    } else {
      console.log('Skipping chart creation on the server');
    }
  }

  createChart() {
    //declaration chart
    const ctx = this.verticalChart.nativeElement.getContext('2d');

    if (ctx) {
      this.specialiteService.statEnseignatParSpecialite().subscribe(
        data => {
          this.MapList = data;

          const labels = Object.keys(data); // specialite
          const chartData = Object.values(data); // pourcentage

          //labels.push("Total");
          chartData.push(100);

          // Now that we have the data, we can initialize the chart here
          const chart = new Chart(ctx, {
            type: 'bar', // You can change this to 'line', 'pie', etc.
            data: {
              labels: labels, // Use the labels from the data
              datasets: [{
                label: 'Statistique Proffeseur Par Specialite',
                data: chartData, // Use the extracted data
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(199, 199, 199, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(199, 199, 199, 0.2)',
                ],
                borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                  'rgba(199, 199, 199, 1)',

                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                  'rgba(199, 199, 199, 1)'
                ],
                borderWidth: 1
              }]
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }
          });
        },
        (error: HttpErrorResponse) => {
          this.errorMessage = 'Une erreur s\' ' + error.message;
        }
      );
    } else {
      console.error('Failed to get canvas context');
    }
  }

}
