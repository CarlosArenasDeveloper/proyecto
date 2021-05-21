import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, Label, MultiDataSet } from 'ng2-charts';
import { AdminService } from '../services/admin.service';
import { Grafica } from '../../models/interface';

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
  consulta!: any;
  clientes: number = 0;
  monitores: number = 0;
  consultaMonitores!: any;
  anioActual = new Date().getFullYear();
  public colors: Color[] = [
    {
      backgroundColor: ['#0075ED', '#e6e718', '#11C40E', '#C40E32'],
    },
  ];

  // arrayMeses: Grafica[] = [];
  arrayMeses: any = [];

  public altas: any = [];
  public bajas: any = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService
      .getGraficaClientesFechaBis(this.anioActual)
      .subscribe((resp) => {
        this.arrayMeses = resp;
        console.log(resp);
      });

    //  this.arrayMeses.shift();
    this.adminService.getGraficaSexo().subscribe((resp) => {
      this.labelsSexo = Object.keys(resp);
      this.dataSexo = Object.values(resp);
    });

    this.adminService.getGraficaSexoMonitores().subscribe((resp) => {
      this.labelsSexoMonitores = Object.keys(resp);
      this.dataSexoMonitores = Object.values(resp);
    });

    this.adminService.getGraficaUsuariosPorGym().subscribe((resp) => {
      this.consulta = resp;
      for (let gym of this.consulta) {
        this.labels.push(gym.nombre);
        this.clientes += parseInt(gym.centros);
        this.data.push(gym.centros);
      }
      this.doughnutChartLabels = this.labels;
      this.doughnutChartData = this.data;
    });

    this.adminService.getGraficaMonitoresPorGym().subscribe((resp) => {
      this.consultaMonitores = resp;
      for (let gym of this.consultaMonitores) {
        this.labelsMonitores.push(gym.nombre);
        this.monitores += parseInt(gym.centros);
        this.dataMonitores.push(gym.centros);
      }
      this.doughnutChartLabelsMonitores = this.labelsMonitores;
      this.doughnutChartDataMonitores = this.dataMonitores;
    });
  }
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
  };
  public barChartLabels: Label[] = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
    {
      data: this.altas,
      label: 'Altas',
    },
    { data: this.bajas, label: 'Bajas' },
  ];

  // events
  public chartClicked({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public randomize(): void {
    this.barChartType = this.barChartType === 'bar' ? 'line' : 'bar';
  }

  verDatos() {
    if (this.altas.length > 0 && this.bajas.length > 0) {
      this.altas = [];
      this.bajas = [];
      for (let i = 0; i < this.arrayMeses.length; i++) {
        this.altas.push(this.arrayMeses[i].altas);
        this.bajas.push(this.arrayMeses[i].bajas);
      }
      this.barChartData = [
        {
          data: this.altas,
          label: 'Altas',
        },
        { data: this.bajas, label: 'Bajas' },
      ];
    }

    for (let i = 0; i < this.arrayMeses.length; i++) {
      this.altas.push(this.arrayMeses[i].altas);
      this.bajas.push(this.arrayMeses[i].bajas);
    }
  }

  siguiente() {
    this.arrayMeses = [];

    let anioProximo = this.anioActual + 1;
    console.log(anioProximo);

    this.adminService
      .getGraficaClientesFechaBis(anioProximo)
      .subscribe((resp) => {
        this.arrayMeses = resp;
        console.log(resp);
      });
    console.log(this.arrayMeses);
    this.anioActual = this.anioActual + 1;
    this.verDatos();
  }

  anterior() {
    this.arrayMeses = [];

    let anioAnterior = this.anioActual - 1;
    console.log(anioAnterior);

    this.adminService
      .getGraficaClientesFechaBis(anioAnterior)
      .subscribe((resp) => {
        this.arrayMeses = resp;
        console.log(resp);
      });
    this.anioActual = this.anioActual - 1;
    this.verDatos();
  }
}
