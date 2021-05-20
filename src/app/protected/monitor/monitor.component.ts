import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { Color, Label, MultiDataSet } from 'ng2-charts';
import { AdminService } from '../services/admin.service';
import { Usuario } from '../../models/interface';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.css']
})
export class MonitorComponent implements OnInit {

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
  nombre!:any

  public colors: Color[] = [
    {
      backgroundColor: ['#0075ED', '#e6e718','#11C40E','#C40E32'],
    },
  ];
  constructor(private adminService: AdminService) {}
  ngOnInit(): void {
    const usuario: Usuario = JSON.parse(sessionStorage.getItem('usuario')!);

this.adminService.getCentroPorId(usuario.id_centro!).subscribe(centro=>{
  this.nombre=centro.nombre
})

     this.adminService.getGraficaSexoPorGimnasio(usuario.id_centro!).subscribe((resp) => {
       this.labelsSexo = Object.keys(resp);
       this.dataSexo=Object.values(resp);
       
     });

     this.adminService.getGraficaSexoMonitoresPorGimnasio(usuario.id_centro!).subscribe((resp) => {
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
}
