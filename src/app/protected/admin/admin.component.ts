import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, Label, MultiDataSet } from 'ng2-charts';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  
  public doughnutChartLabels: Label[] = [];
  public doughnutChartLabelsMonitores: Label[] = [];

  public labels: Label[] = [];
  public labelsMonitores: Label[] = [];
  public labelsSexo: Label[] = [];
  public labelsSexoMonitores: Label[] = [];


  public doughnutChartData: MultiDataSet = [];
  public doughnutChartDataMonitores: MultiDataSet = [];

  public data: MultiDataSet = [];
  public dataMonitores: MultiDataSet = [];
  public dataSexo: MultiDataSet = [];
  public dataSexoMonitores: MultiDataSet = [];


  public doughnutChartType: ChartType = 'doughnut';
  consulta!:any;
  clientes:number=0;
  monitores:number=0;
  consultaMonitores!:any;
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
     });

     this.adminService.getGraficaSexoMonitores().subscribe((resp) => {
      this.labelsSexoMonitores = Object.keys(resp);
      this.dataSexoMonitores=Object.values(resp);
 
    });

    this.adminService.getGraficaUsuariosPorGym().subscribe((resp)=>{
      this.consulta=resp;
      for (let gym of this.consulta){
        this.labels.push(gym.nombre);
        this.clientes+=parseInt(gym.centros);
        this.data.push(gym.centros)
      }
      this.doughnutChartLabels=this.labels;
      this.doughnutChartData=this.data;
    })

    this.adminService.getGraficaMonitoresPorGym().subscribe((resp)=>{
      this.consultaMonitores=resp;
      for (let gym of this.consultaMonitores){
        this.labelsMonitores.push(gym.nombre);
        this.monitores+=parseInt(gym.centros);
        this.dataMonitores.push(gym.centros)
      }
      this.doughnutChartLabelsMonitores=this.labelsMonitores;
      this.doughnutChartDataMonitores=this.dataMonitores;
    })
  }
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
  };
  public barChartLabels: Label[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40,12,34,111,121,12], label: 'Altas' },
    { data: [28, 48, 40, 19, 86, 27, 90,12,34,111,121,12], label: 'Bajas' }
  ];



  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public randomize(): void {
    this.barChartType = this.barChartType === 'bar' ? 'line' : 'bar';
  }
}
