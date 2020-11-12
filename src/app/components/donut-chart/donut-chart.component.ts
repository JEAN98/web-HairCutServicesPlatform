import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.css']
})
export class DonutChartComponent implements OnInit {
  @Input('doughnutChartLabels') doughnutChartLabels:String[] = [];
  @Input('doughnutChartData') doughnutChartData:number[]= [];
  @Input('doughnutChartType') doughnutChartType = '';
  constructor() { }

  ngOnInit(): void {
  }

}
