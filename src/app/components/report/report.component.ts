import { Component, OnInit } from '@angular/core';
import { Label, MultiDataSet, SingleDataSet } from 'ng2-charts';
import { ReportService } from 'src/app/services/report.service';
//import { Label, MultiDataSet } from 'ng2-charts/lib/base-chart.directive';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  public graphic: any;
  public sppinerClass:String = '';
  public isRendering = true;
  public top10Clients = [];
  constructor(private reportService: ReportService) {
  
   }

  ngOnInit(): void {
 
  
  }
  ngAfterContentInit():void{
    this.load_reports();
  }

  active_sppiner()
  {
    this.sppinerClass = 'spinner-border';
  }

  pause_sppiner()
  {
    this.sppinerClass = '';
  }
  load_reports()
  {
    this.active_sppiner();
    this.reportService.getReportList().toPromise()
    .then((res =>{
        this.set_percetange_services_list(res["percentageOfServices"]);
        this.set_top_client_list(res["topClients"]);
        this.pause_sppiner();
    }))
    .catch(err =>{
      console.log(err);
      this.pause_sppiner();
    })
  }

  set_top_client_list(clients:[])
  {
      this.top10Clients = clients;
  }

  set_percetange_services_list(percentageOfServicesList:[])
  {
    let percetangeList = [];
    let labelList = [];
      for (let index = 0; index < percentageOfServicesList.length; index++) {
        percetangeList.push(percentageOfServicesList[index]["percentage"]);
        labelList.push(percentageOfServicesList[index]["title"]);
      }
      this.graphic = {
        labels:labelList,
        data:percetangeList,
        type:"doughnut"
      };
      this.isRendering = false;
      /*
      this.graphic.labels = labelList;
     this.graphic.type = 'doughnut';
     this.graphic.data = percetangeList;*/
  }

}
