declare var require:any
const esLocale = require('@fullcalendar/core/locales/es');
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import Swal from 'sweetalert2';
import Tooltip from 'tooltip.js';
import { TranslateService } from '@ngx-translate/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, Label, MultiDataSet } from 'ng2-charts';
@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  public labelsSexo: Label[] = [`${this.translateService.instant('realizadas')}`,`${this.translateService.instant('canceladas')}`,`${this.translateService.instant('pendientes')}`];
  public dataSexo: MultiDataSet = [];
  public doughnutChartType: ChartType = 'doughnut';
  public colors: Color[] = [
    {
      backgroundColor: ['#0075ED', '#e6e718', '#11C40E', '#C40E32'],
    },
  ];

  public events: any;
  public eventsPendientes: any;

  email!: string;
  usuario!: any;
  reservas!: any;
  public optionsMonth: any;
  public optionsList: any;
  public idioma:any;
  constructor(private router: Router, private adminService: AdminService,private translateService:TranslateService) {
    const usuario = JSON.parse(sessionStorage.getItem('usuario')!);
    this.usuario = usuario;

    if(localStorage.getItem('lang')=='es'){
      this.idioma=esLocale
    } else{
      this.idioma=""
    } 

    this.adminService.seleccionarNumReservasRealizadas(this.usuario.email).subscribe((resp) => {
      this.dataSexo = Object.values(resp);
    });

    this.adminService
    .seleccionarSesionesCliente(this.usuario.email)
    .subscribe((events) => {
      this.events = events;
    });

    this.adminService
    .seleccionarSesionesPendientesCliente(this.usuario.email)
    .subscribe((eventos) => {
      this.eventsPendientes = eventos;
    });
    
    this.optionsList = {
      contentHeight: 400,
      plugins: [dayGridPlugin, listPlugin, interactionPlugin],
      defaultDate: new Date(),
      duration: { days: 14 },
      defaultView: 'list',
      locale: this.idioma,
      header: {
        left: '',
        center: 'title',
        right: '',
      },
      editable: false,
      eventClick:function(info:any){
        Swal.fire({
          // title: `¿Estas seguro de querer eliminar la reserva?`,
          title:`${translateService.instant('Cancelar reserva')}`,
          text: `¿ ${translateService.instant('Quieres cancelar la clase de')} ${
            info.event.title
          } ${translateService.instant('para el')} ${info.event.start.toLocaleDateString()} ${translateService.instant('a las')}  ${(
            '0' + info.event.start.getHours()
          ).substr(-2)}:${(
            '0' + info.event.start.getMinutes()
          ).substr(-2)}?`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: `${translateService.instant('Si, cancelar')}`,
          cancelButtonText: 'No',
        }).then((result) => {
          if (result.isConfirmed) {
            const reserva={
              id_sesion: info.event.id,
              email_cliente: usuario.email
            }  
            adminService.borrarReserva(reserva).subscribe((resp) => {
              if (resp == null) {
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: `${translateService.instant('Reserva cancelada correctamente')}`,
                  text:`${translateService.instant('Gracias por dejar una plaza libre para otro usuario')}`,
                  showConfirmButton: false,
                  timer: 2000,
                }).then((result) => {
                  location.reload();
                });
              }
            });
          }
        });
      }
    };
    this.optionsMonth = {
      hemeSystem: 'lumen',
      eventLimit: true,
      showNonCurrentDates: false,
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      defaultDate: new Date(),
      locale: this.idioma,
      header: {
        left: 'prev,next',
        center: 'title',
        right: 'dayGridMonth, dayGridWeek, dayGridDay',
      },
      editable: false,
      eventClick: function (info: any) {
        switch (info.event.extendedProps.estado) {
          case 'finalizada':
            Swal.fire({
              title: `${translateService.instant('La sesion ha finalizado')}`,
              text:`${translateService.instant('Esperamos volver a verte pronto')}`,
              icon: 'warning',
              position: 'top-end',
              timer: 2000,
              showConfirmButton: false,

            });
            break;
          case 'cancelada':
            Swal.fire({
              position: 'top-end',
              icon: 'warning',
              title: `${translateService.instant('Sesion cancelada')}`,
              text: `${translateService.instant('Lo sentimos, la sesion y la reserva realizada anteriormente han sido canceladas, disculpe las molestias')}.`,
              showConfirmButton: false,
              timer: 3500,
            });
            break;
          default:
            Swal.fire({
              // title: `¿Estas seguro de querer eliminar la reserva?`,
              title:`${translateService.instant('Cancelar reserva')}`,
              text: `¿ ${translateService.instant('Quieres cancelar la clase de')} ${
                info.event.title
              } ${translateService.instant('para el')} ${info.event.start.toLocaleDateString()} ${translateService.instant('a las')}  ${(
                '0' + info.event.start.getHours()
              ).substr(-2)}:${(
                '0' + info.event.start.getMinutes()
              ).substr(-2)}?`,
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: `${translateService.instant('Si, cancelar')}`,
              cancelButtonText: 'No',
            }).then((result) => {
              if (result.isConfirmed) {
                const reserva={
                  id_sesion: info.event.id,
                  email_cliente: usuario.email
                }  
                adminService.borrarReserva(reserva).subscribe((resp) => {
                  if (resp == null) {
                    Swal.fire({
                      position: 'top-end',
                      icon: 'success',
                      title: `${translateService.instant('Reserva cancelada correctamente')}`,
                      text:`${translateService.instant('Gracias por dejar una plaza libre para otro usuario')}`,
                      showConfirmButton: false,
                      timer: 2000,
                    }).then((result) => {
                      location.reload();
                    });
                  }
                });
              }
            });
            break;
        }
      },
      eventRender: function (e: any) {
        var tooltip = new Tooltip(e.el, {
          title:
            '<h6>' +
            e.event.title +
            '</h6>' +
            '<h6>' +
            ('0' + e.event.start.getHours()).substr(-2) +
            ':' +
            ('0' + e.event.start.getMinutes()).substr(-2) +
            ' - ' +
            ('0' + e.event.end.getHours()).substr(-2) +
            ':' +
            ('0' + e.event.end.getMinutes()).substr(-2) +
            '</h6>' +
            '<hr>' +
            `<span>${translateService.instant('Sala')} ` +
            e.event.extendedProps.sala +
            '</span>' +
            "<br><span><i class='fas fa-stopwatch'></i>: " +
            Math.abs(e.event.start - e.event.end) / 1000 / 60 +
            ` ${translateService.instant('minutos')} </span>` +
            '<br>' +
            `<span>${translateService.instant('Plazas disponibles')}: ` +
            (e.event.extendedProps.aforo - e.event.extendedProps.num_clientes) +
            '<br></span>' +
            `<span>${translateService.instant('Estado')}: ` +
            e.event.extendedProps.estado +
            '</span>' +
            '<br>',
          placement: 'top',
          trigger: 'hover',
          container: 'body',
          html: true,
        });
      },
    };
  }
  ngOnInit(): void {
    $('.tooltip').remove();

    const usuario = JSON.parse(sessionStorage.getItem('usuario')!);
    this.usuario = usuario;

    this.adminService
      .seleccionarSesionesCliente(this.usuario.email)
      .subscribe((events) => {
        this.events = events;
      });

      this.adminService
      .seleccionarSesionesPendientesCliente(this.usuario.email)
      .subscribe((eventos) => {
        this.eventsPendientes = eventos;
      });
  }

}
