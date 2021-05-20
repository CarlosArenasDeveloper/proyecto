import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { Color, Label, MultiDataSet } from 'ng2-charts';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  
  public doughnutChartLabels: Label[] = [];
  public doughnutChartData: MultiDataSet = [];
  public labels: Label[] = [];
  public labelsSexo: Label[] = [];


  public data: MultiDataSet = [];
  public dataSexo: MultiDataSet = [];

  public doughnutChartType: ChartType = 'doughnut';
  consulta!:any;
  public colors: Color[] = [
    {
      backgroundColor: ['#0075ED', '#e6e718','#11C40E','#C40E32'],
    },
  ];
  constructor(private adminService: AdminService) {}
  ngOnInit(): void {
     this.adminService.getGraficaSexo().subscribe((resp) => {
       this.labelsSexo = Object.keys(resp);
       this.dataSexo=Object.values(resp);
       console.log(this.labelsSexo);
      console.log(this.dataSexo);
     });

    this.adminService.getGraficaUsuariosPorGym().subscribe((resp)=>{
      this.consulta=resp;
      console.log(this.consulta);
      for (let gym of this.consulta){
        this.labels.push(gym.nombre);
        this.data.push(gym.centros)
      }
      this.doughnutChartLabels=this.labels;
      this.doughnutChartData=this.data;
    })
  }
  
}
