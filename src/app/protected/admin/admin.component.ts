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
  anioFijo = new Date().getFullYear();
  numAltas: number = 0;
  numBajas: number = 0;
  isSpanish:boolean=true;

  public colors: Color[] = [
    {
      backgroundColor: ['#0075ED', '#e6e718', '#11C40E', '#C40E32'],
    },
  ];

  // arrayMeses: Grafica[] = [];
  arrayMeses: any = [];

  public altas: any = [];
  public bajas: any = [];

  constructor(private adminService: AdminService) {
    if (localStorage.getItem('lang') == 'en') {
      this.isSpanish = false;
    } 
  }

  ngOnInit(): void {
    this.adminService
      .getGraficaClientesFechaBis(this.anioActual)
      .subscribe((resp) => {
        this.arrayMeses = resp;
        for (let i = 0; i < this.arrayMeses.length; i++) {
          this.numAltas += parseInt(this.arrayMeses[i].altas);
          this.numBajas += parseInt(this.arrayMeses[i].bajas);
          this.altas.push(this.arrayMeses[i].altas);
          this.bajas.push(this.arrayMeses[i].bajas);
        }
      });

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
  public barChartLabelsIngles: Label[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
    { data: this.bajas, label: 'Bajas' },

    {
      data: this.altas,
      label: 'Altas',
    },
  ];

  public barChartDataIngles: ChartDataSets[] = [
    { data: this.bajas, label: 'Unsubscribe' },

    {
      data: this.altas,
      label: 'Admission',
    },
  ];

  // events
  public chartClicked({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
  }

  public chartHovered({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
  }

  public randomize(): void {
    this.barChartType = this.barChartType === 'bar' ? 'line' : 'bar';
  }

  siguiente() {
    if (this.anioFijo <= this.anioActual + 1) {
      $('#siguiente').prop('disabled', true);
    }
    const anio = new Date().getFullYear();
    if (anio <= this.anioActual) {
      return;
    }
    this.arrayMeses = [];

    let anioProximo = this.anioActual + 1;
    //console.log(anioProximo);

    this.adminService
      .getGraficaClientesFechaBis(anioProximo)
      .subscribe((resp) => {
        this.arrayMeses = resp;
        this.anioActual = this.anioActual + 1;
        if (this.altas.length > 0 && this.bajas.length > 0) {
          this.altas = [];
          this.bajas = [];
          this.numAltas = 0;
          this.numBajas = 0;
          for (let i = 0; i < this.arrayMeses.length; i++) {
            this.numAltas += parseInt(this.arrayMeses[i].altas);
            this.numBajas += parseInt(this.arrayMeses[i].bajas);
            this.altas.push(this.arrayMeses[i].altas);
            this.bajas.push(this.arrayMeses[i].bajas);
          }
          this.barChartData = [
            { data: this.bajas, label: 'Bajas' },

            {
              data: this.altas,
              label: 'Altas',
            },
          ];

           this.barChartDataIngles = [
            { data: this.bajas, label: 'Unsubscribe' },
        
            {
              data: this.altas,
              label: 'Admission',
            },
          ];
        }
      });
    //this.verDatos();
  }

  anterior() {
    $('#siguiente').prop('disabled', false);

    this.arrayMeses = [];

    let anioAnterior = this.anioActual - 1;

    this.adminService
      .getGraficaClientesFechaBis(anioAnterior)
      .subscribe((resp) => {
        this.arrayMeses = resp;
        this.anioActual = this.anioActual - 1;
        if (this.altas.length > 0 && this.bajas.length > 0) {
          this.altas = [];
          this.bajas = [];
          this.numAltas = 0;
          this.numBajas = 0;
          for (let i = 0; i < this.arrayMeses.length; i++) {
            this.numAltas += parseInt(this.arrayMeses[i].altas);
            this.numBajas += parseInt(this.arrayMeses[i].bajas);
            this.altas.push(this.arrayMeses[i].altas);
            this.bajas.push(this.arrayMeses[i].bajas);
          }
          this.barChartData = [
            { data: this.bajas, label: 'Bajas' },
            {
              data: this.altas,
              label: 'Altas',
            },
          ];
          this.barChartDataIngles = [
            { data: this.bajas, label: 'Unsubscribe' },
        
            {
              data: this.altas,
              label: 'Admission',
            },
          ];
        }
      });
  }
}
