declare var require:any
import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
//import esLocale from '@fullcalendar/core/locales/es';
const esLocale = require('@fullcalendar/core/locales/es');
import { Router } from '@angular/router';
import Tooltip from 'tooltip.js';
import { AdminService } from 'src/app/protected/services/admin.service';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css'],
})
export class ReservasComponent implements OnInit {
  public events: any;
  email!: string;
  usuario!: any;
  reservas!: any;
  public optionsMonth: any;
  public optionsList: any;
  public idioma: any;
  constructor(
    private router: Router,
    private adminService: AdminService,
    private translateService: TranslateService
  ) {
    if (localStorage.getItem('lang') == 'es') {
      this.idioma = esLocale;
    } else {
      this.idioma = '';
    }

    const usuario = JSON.parse(sessionStorage.getItem('usuario')!);
    this.usuario = usuario;

    this.adminService
      .getSesionesDisponiblesPorTarifa(this.usuario.id_tarifa)
      .subscribe((events) => {
        this.events = events;
      });

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
        adminService
          .getReservasClienteIDSesion(usuario.email)
          .subscribe((reservas: any) => {
            this.reservas = reservas;
            if (
              info.event.extendedProps.estado != 'cancelada' &&
              reservas.includes(info.event.id)
            ) {
              Swal.fire({
                position: 'top-end',
                icon: 'warning',
                title: `${translateService.instant('Reserva no realizada')}`,
                text: `${translateService.instant(
                  'Ya ha realizado la reserva de esta sesion'
                )}`,
                showConfirmButton: false,
                timer: 2000,
              });
            } else if (
              info.event.extendedProps.estado == 'cancelada' &&
              reservas.includes(info.event.id)
            ) {
              Swal.fire({
                position: 'top-end',
                icon: 'warning',
                title: `${translateService.instant('Sesion cancelada')}`,
                text: `${translateService.instant(
                  'Lo sentimos, la sesion y la reserva realizada anteriormente han sido canceladas, disculpe las molestias'
                )}.`,
                showConfirmButton: false,
                timer: 3500,
              });
            } else {
              switch (info.event.extendedProps.estado) {
                case 'incompleta':
                  event!.preventDefault();
                  const id = parseInt(info.event.id);
                  // router.navigateByUrl(`/dashboard/reservar-sesion/${id}`);
                  const reserva = {
                    id_sesion: id,
                    email_cliente: usuario.email,
                  };
                  Swal.fire({
                    title: `${translateService.instant('Realizar reserva')}`,
                    text: `¿${translateService.instant(
                      'Quieres reservar la clase de'
                    )} ${info.event.title} ${translateService.instant(
                      'para el'
                    )} ${info.event.start.toLocaleDateString()} ${translateService.instant(
                      'a las'
                    )}  ${('0' + info.event.start.getHours()).substr(-2)}:${(
                      '0' + info.event.start.getMinutes()
                    ).substr(-2)}?`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: `${translateService.instant(
                      'Si, reservar'
                    )}`,
                    cancelButtonText: 'No',
                  }).then((result) => {
                    if (result.isConfirmed) {
                      adminService
                        .addReserva(reserva)
                        .subscribe((resp: any) => {
                          if (resp == null) {
                            Swal.fire({
                              position: 'top-end',
                              icon: 'success',
                              title: `${translateService.instant(
                                'Reserva realizada con exito!'
                              )}`,
                              text: `${translateService.instant(
                                'Se le ha enviado un correo electronico a su email con los detalles de la reserva'
                              )}`,
                              showConfirmButton: false,
                              timer: 2500,
                            }).then(() => {
                              router.navigateByUrl('/dashboard/cliente');
                            });
                          }
                        });
                    }
                  });
                  break;

                case 'completa':
                  Swal.fire({
                    position: 'top-end',
                    icon: 'warning',
                    title: `${translateService.instant(
                      'Reserva no realizada'
                    )}`,
                    text: `${translateService.instant(
                      'Lo sentimos. La sesion esta completa'
                    )}`,
                    showConfirmButton: false,
                    timer: 2000,
                  });
                  break;

                case 'cancelada':
                  Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: `${translateService.instant('Sesion cancelada')}`,
                    text: `${translateService.instant(
                      'No se puede realizar la reserva ya que la sesion ha sido cancelada, disculpe las molestias'
                    )}.`,
                    showConfirmButton: false,
                    timer: 3500,
                  });
                  break;
              }
            }
          });
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
      .getReservasClienteIDSesion(this.usuario.email)
      .subscribe((reservas) => {
        this.reservas = reservas;
        console.log(this.reservas);
      });

    this.adminService
      .getSesionesDisponiblesPorTarifa(this.usuario.id_tarifa)
      .subscribe((events) => {
        this.events = events;
      });
  }
}
