import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import Swal from 'sweetalert2';
import { Sesion, Usuario } from '../../../../models/interface';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import esLocale from '@fullcalendar/core/locales/es';
import { Router } from '@angular/router';
import Tooltip from 'tooltip.js';

@Component({
  selector: 'app-lista-sesiones',
  templateUrl: './lista-sesiones.component.html',
  styles: [`

*{
    cursor: pointer;
}
 
  /* .popper,
  .tooltip {
    position: absolute;
    z-index: 9999;
    background: #e97a92;
    color: black;
    width: 150px;
    border-radius: 5px;
    border-color: solid;
    box-shadow: 0 0 5px rgba(0,0,0,0.5);
    padding: 10px;
    text-align: justify;
  }
  .style5 .tooltip {
    background: #1E252B;
    color: #FFFFFF;
    max-width: 200px;
    width: auto;
    font-size: .8rem;
    padding: .5em 1em;
  }
  .popper .popper__arrow,
  .tooltip .tooltip-arrow {
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: 5px;
  }
  
  .tooltip .tooltip-arrow,
  .popper .popper__arrow {
    border-color: #ff077b;
  }
  .style5 .tooltip .tooltip-arrow {
    border-color: #1E252B;
  }
  .popper[x-placement^="top"],
  .tooltip[x-placement^="top"] {
    margin-bottom: 5px;
  }
  .popper[x-placement^="top"] .popper__arrow,
  .tooltip[x-placement^="top"] .tooltip-arrow {
    border-width: 5px 5px 0 5px;
    border-left-color: transparent;
    border-right-color: transparent;
    border-bottom-color: transparent;
    bottom: -5px;
    left: calc(50% - 5px);
    margin-top: 0;
    margin-bottom: 0;
  }
  .popper[x-placement^="bottom"],
  .tooltip[x-placement^="bottom"] {
    margin-top: 5px;
  }
  .tooltip[x-placement^="bottom"] .tooltip-arrow,
  .popper[x-placement^="bottom"] .popper__arrow {
    border-width: 0 5px 5px 5px;
    border-left-color: transparent;
    border-right-color: transparent;
    border-top-color: transparent;
    top: -5px;
    left: calc(50% - 5px);
    margin-top: 0;
    margin-bottom: 0;
  }
  .tooltip[x-placement^="right"],
  .popper[x-placement^="right"] {
    margin-left: 5px;
  }
  .popper[x-placement^="right"] .popper__arrow,
  .tooltip[x-placement^="right"] .tooltip-arrow {
    border-width: 5px 5px 5px 0;
    border-left-color: transparent;
    border-top-color: transparent;
    border-bottom-color: transparent;
    left: -5px;
    top: calc(50% - 5px);
    margin-left: 0;
    margin-right: 0;
  }
  .popper[x-placement^="left"],
  .tooltip[x-placement^="left"] {
    margin-right: 5px;
  }
  .popper[x-placement^="left"] .popper__arrow,
  .tooltip[x-placement^="left"] .tooltip-arrow {
    border-width: 5px 0 5px 5px;
    border-top-color: transparent;
    border-right-color: transparent;
    border-bottom-color: transparent;
    right: -5px;
    top: calc(50% - 5px);
    margin-left: 0;
    margin-right: 0;
  } */
  `
  ],
})
export class ListaSesionesComponent {
  public events: any;

  public optionsMonth: any;
  public optionsList: any;
  constructor(private router: Router,private adminService:AdminService) {
    this.adminService.getPrueba().subscribe((events) => {
      this.events = events;
      console.log(this.events);
    });
    this.optionsList = {
      contentHeight: 700,
      plugins: [dayGridPlugin, listPlugin, interactionPlugin],
      defaultDate: new Date(),
      duration: { days: 7 },
      defaultView: 'list',
      locale: esLocale,
      header: {
        left: '',
        center: 'title',
        right: ''
      },
      editable: false,
      eventClick: function (info: any) {
        event!.preventDefault();
        const id = parseInt(info.event.id);
        router.navigateByUrl(`/dashboard/admin/sesiones/editar-sesion/${id}`);
      },
    };
    this.optionsMonth = {
      hemeSystem: 'lumen',
      eventLimit: true,
      showNonCurrentDates: false,
      selectable: true,
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      defaultDate: new Date(),
       locale: esLocale,
      header: {
        left: "prev,next",
        center: "title",
        right: "dayGridMonth, dayGridWeek, dayGridDay",
      },
      dateClick: function (info:any) {
        console.log(info);
        localStorage.setItem("fecha", info.date);
        router.navigateByUrl(`/dashboard/admin/sesiones/add-sesion`);
      },
        editable: false,
      eventClick: function (info:any) {
        event!.preventDefault();
        const id = parseInt(info.event.id);
        router.navigateByUrl(`/dashboard/admin/sesiones/editar-sesion/${id}`);
      },
      eventRender: function (e:any) {
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
}
