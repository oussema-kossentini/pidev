import { Component, Input } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent {
  @Input() pieChartData: any[] = [
    { "name": "Lucy Cheng", "value": 150 },
    { "name": "Yezeu Joy", "value": 300 },
    { "name": "Opus Mei", "value": 450 },
    // ... other data
  ];

  // Define the colorScheme with the required properties
  @Input() colorScheme: Color = {
    name: 'vivid',
    selectable: true,
    group: ScaleType.Ordinal, // This should match an actual value from ScaleType
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  @Input() view: [number, number] = [700, 400];

  constructor() {}

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }
}
