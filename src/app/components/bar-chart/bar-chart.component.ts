// bar-chart.component.ts

import { Component } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent {
  // Define the 'view' property which determines the dimensions of the chart
  view: [number, number] = [700, 300]; // for example, width=700, height=300

  // Define the data for the bar chart
  barChartData = [
    { name: 'Math', value: 10 },
    { name: 'Science', value: 20 },
    { name: 'Histoire', value: 15 },
    { name: 'Informatique', value: 25 }
  ];

  // Define the color scheme for the chart
  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'] // or other colors as needed
  };

  // Define the options for the bar chart
  barChartOptions = {
    showXAxis: true,
    showYAxis: true,
    gradient: false,
    showLegend: true,
    showXAxisLabel: true,
    xAxisLabel: 'Top contributors',
    showYAxisLabel: true,
    yAxisLabel: 'Contribution value'
  };

  onSelect(event: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(event)));
  }
}
