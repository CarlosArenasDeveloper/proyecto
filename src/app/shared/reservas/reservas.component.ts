import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import esLocale from '@fullcalendar/core/locales/es';
import { Router } from '@angular/router';
import Tooltip from 'tooltip.js';
import { AdminService } from 'src/app/protected/services/admin.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css'],
})
export class ReservasComponent implements OnInit {
  public events: any;
  reserva!: any;
  email!: string;
  usuario!: any;
  public optionsMonth: any;
  public optionsList: any;
  constructor(private router: Router, private adminService: AdminService) {
    this.adminService.getSesionesDisponibles().subscribe((events) => {
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
        right: '',
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
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      defaultDate: new Date(),
      locale: esLocale,
      header: {
        left: 'prev,next',
        center: 'title',
        right: 'dayGridMonth, dayGridWeek, dayGridDay',
      },
      editable: false,
      eventClick: function (info: any) {
        if(info.event.extendedProps.estado=='incompleta'){
          event!.preventDefault();
          const id = parseInt(info.event.id);
          router.navigateByUrl(`/dashboard/reservar-sesion/${id}`);
        }
      },
      eventRender: function (e: any) {
        var tooltip = new Tooltip(e.el, {
          title:
            '<h6>' +
            e.event.title +
            '</h6>' +
            '<hr>' +
            '<span>Sala ' +
            e.event.extendedProps.sala +
            '</span>' +
            "<br><span><i class='fas fa-stopwatch'></i>: "+
            (((Math.abs(e.event.start - e.event.end)/1000)/60)) 
            +" minutos </span>"+
            "<br>"+
            "<span>Plazas disponibles: "+ 
            (e.event.extendedProps.aforo -  e.event.extendedProps.num_clientes)
            +"<br></span>"+
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
    const usuario = JSON.parse(sessionStorage.getItem('usuario')!);
    this.usuario = usuario;
    this.adminService.getSesionesDisponibles().subscribe((events) => {
      this.events = events;
      console.log(this.events);
    });
  }
}
