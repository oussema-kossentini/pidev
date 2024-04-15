import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements AfterViewInit {
  @ViewChild('lineChart', { static: true }) chartElement!: ElementRef;

  lineChartData: any[] = [
    {
      name: 'Matched',
      series: [
        { name: new Date('2020-07-17'), value: 6500 },
        { name: new Date('2020-07-18'), value: 6300 },
        // ... your additional data points
      ]
    },
    {
      name: 'Mismatched',
      series: [
        { name: new Date('2020-07-17'), value: 4000 },
        { name: new Date('2020-07-18'), value: 4200 },
        // ... your additional data points
      ]
    }
  ];

  colorScheme: Color = {
    domain: ['#2FBFA7', '#C7B42C'],
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
  };

  xAxisLabel: string = 'Date';
  yAxisLabel: string = 'Value';

  constructor() {}

  ngAfterViewInit(): void {
    // Custom logic to interact with the chart can be called here
  }
}
