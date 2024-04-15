import { Component } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-card-chart',
  templateUrl: './card-chart.component.html',
  styleUrls: ['./card-chart.component.scss']
})
export class CardChartComponent {
  cardData = [
    {
      title: 'Informatique',
      value: 10260,
      colorScheme: {
        name: 'informatique',
        selectable: true,
        group: ScaleType.Ordinal,
        domain: ['#5AA454'] // Remplacez #COLOR1 par la couleur du secteur "Lucy Cheng"
      }
    },
    {
      title: 'Science',
      value: 2363,
      colorScheme: {
        name: 'science',
        selectable: true,
        group: ScaleType.Ordinal,
        domain: ['#A10A28'] // Remplacez #COLOR2 par la couleur du secteur "Yeezu Joy"
      }
    },
    {
      title: 'Histoire',
      value: 711,
      colorScheme: {
        name: 'histoire',
        selectable: true,
        group: ScaleType.Ordinal,
        domain: ['#C7B42C'] // Remplacez #COLOR3 par la couleur du secteur "Opus Mei"
      }
    },

    {
      title: 'Math',
      value: 711,
      colorScheme: {
        name: 'math',
        selectable: true,
        group: ScaleType.Ordinal,
        domain: ['#2FBFA7'] // Remplacez #COLOR3 par la couleur du secteur "Opus Mei"
      }
    }
  ];

  view: [number, number] = [300, 200]; // ajustez selon les besoins

  // ...
}
