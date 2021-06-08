declare var require:any
const esLocale = require('@fullcalendar/core/locales/es');
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../../services/admin.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
//import esLocale from '@fullcalendar/core/locales/es' ;
import timeGridPlugin from '@fullcalendar/timegrid';
import Tooltip from 'tooltip.js';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-lista-all-sesiones',
  templateUrl: './lista-all-sesiones.component.html',
  styleUrls: ['./lista-all-sesiones.component.css'],
})
export class ListaAllSesionesComponent {
  public events: any;
  public idioma: any;
  public optionsMonth: any;
  public optionsList: any;
  constructor(private router: Router, private adminService: AdminService,private translateService:TranslateService) {
    this.adminService.getPrueba().subscribe((events) => {
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
      selectable: true,
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      defaultDate: new Date(),
      locale: this.idioma,
      header: {
        left: 'prev,next',
        center: 'title',
        right: 'dayGridMonth, dayGridWeek, dayGridDay',
      },
      editable: false,
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
}
