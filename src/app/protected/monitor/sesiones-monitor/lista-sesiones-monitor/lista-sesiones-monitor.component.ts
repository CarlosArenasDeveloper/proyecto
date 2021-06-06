declare var require:any
const esLocale = require('@fullcalendar/core/locales/es');
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../../services/admin.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
//import esLocale from '@fullcalendar/core/locales/es';
import timeGridPlugin from '@fullcalendar/timegrid';
import Swal from 'sweetalert2';
import Tooltip from 'tooltip.js';

@Component({
  selector: 'app-lista-sesiones-monitor',
  templateUrl: './lista-sesiones-monitor.component.html',
  styleUrls: ['./lista-sesiones-monitor.component.css'],
})
export class ListaSesionesMonitorComponent implements OnInit {
  public events: any;
  email!: string;
  usuario!: any;
  reservas!: any;
  public optionsMonth: any;
  public optionsList: any;
  public idioma: any;

  constructor(private router: Router, private adminService: AdminService) {
    const usuario = JSON.parse(sessionStorage.getItem('usuario')!);
    this.usuario = usuario;

    this.adminService
      .seleccionarSesionesMonitor(this.usuario.email)
      .subscribe((events) => {
        this.events = events;
      });

      if (localStorage.getItem('lang') == 'es') {
        this.idioma = esLocale;
      } else {
        this.idioma = '';
      }

    this.optionsList = {
      contentHeight: 700,
      plugins: [dayGridPlugin, listPlugin, interactionPlugin],
      defaultDate: new Date(),
      duration: { days: 7 },
      defaultView: 'list',
      locale: this.idioma,
      header: {
        left: '',
        center: 'title',
        right: '',
      },
      editable: false,
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
              title: `La sesion ha finalizado`,
              icon: 'warning',
              position: 'top-end',
              timer: 2000,
              showConfirmButton: false,

            });
            break;
          case 'cancelada':
            Swal.fire({
              title: `La sesion ya ha sido cancelada`,
              icon: 'warning',
              position: 'top-end',
              timer: 2000,
              showConfirmButton: false,

            });
            break;
          default:
            Swal.fire({
              title: `¿Estas seguro de querer cancelar la sesion?`,
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Si, cancelar',
              cancelButtonText: 'No',
            }).then((result) => {
              if (result.isConfirmed) {
                adminService.cancelarSesion(info.event.id).subscribe((resp) => {
                  if (resp == null) {
                    Swal.fire({
                      position: 'top-end',
                      icon: 'success',
                      title: 'Sesion cancelada correctamente',
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
            // e.event.start.getHours() +
            ':' +
            ('0' + e.event.start.getMinutes()).substr(-2) +
            // e.event.start.getMinutes() +
            ' - ' +
            ('0' + e.event.end.getHours()).substr(-2) +
            ':' +
            ('0' + e.event.end.getMinutes()).substr(-2) +
            '</h6>' +
            '<hr>' +
            '<span>Sala ' +
            e.event.extendedProps.sala +
            '</span>' +
            "<br><span><i class='fas fa-stopwatch'></i>: " +
            Math.abs(e.event.start - e.event.end) / 1000 / 60 +
            ' minutos </span>' +
            '<br>' +
            '<span>Plazas disponibles: ' +
            (e.event.extendedProps.aforo - e.event.extendedProps.num_clientes) +
            '<br></span>' +
            '<span>Estado: ' +
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
      .seleccionarSesionesMonitor(this.usuario.email)
      .subscribe((events) => {
        this.events = events;
      });
  }
}
