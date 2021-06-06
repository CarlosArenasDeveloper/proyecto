import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavegacionComponent } from './navegacion/navegacion.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { ImagenPipe } from './pipes/imagen.pipe';
import { TextoPipe } from './pipes/texto.pipe';
import { HoraPipe } from './pipes/hora.pipe';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';
import {  ReactiveFormsModule } from '@angular/forms';
import { NoticiasComponent } from './noticias/noticias.component';
import { SharedRoutingModule } from './shared-routing.module';
import { InicioComponent } from './inicio/inicio.component';
import { CentrosComponent } from './centros/centros.component';
import { ActividadesComponent } from './actividades/actividades.component';
import { EjerciciosComponent } from './ejercicios/ejercicios.component';
import { ReservasComponent } from './reservas/reservas.component';
import { PieComponent } from './pie/pie.component';
import { CookieComponent } from './cookie/cookie.component';
import { NoticiaComponent } from './noticias/noticia/noticia.component';
import { ActividadComponent } from './actividades/actividad/actividad.component';
import { MiniMapaComponent } from './centros/mini-mapa/mini-mapa.component';
import { MusculoComponent } from './ejercicios/musculo/musculo.component';
import { EjercicioComponent } from './ejercicios/ejercicio/ejercicio.component';
import { ImgPipe } from './pipes/img.pipe';
import {FullCalendarModule} from 'primeng/fullcalendar';
import { CalendarModule } from 'primeng/calendar';
import { ReservarSesionComponent } from './reservas/reservar-sesion/reservar-sesion.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    NavegacionComponent,
    ImagenPipe,
    TextoPipe,
    HoraPipe,
    EditarPerfilComponent,
    NoticiasComponent,
    InicioComponent,
    CentrosComponent,
    ActividadesComponent,
    EjerciciosComponent,
    ReservasComponent,
    PieComponent,
    CookieComponent,
    NoticiaComponent,
    ActividadComponent,
    MiniMapaComponent,
    MusculoComponent,
    EjercicioComponent,
    ImgPipe,
    ReservarSesionComponent,
  ],
  imports: [SharedRoutingModule,CommonModule, RouterModule, MaterialModule,ReactiveFormsModule,    FullCalendarModule,
    CalendarModule,TranslateModule],
  exports: [
    NavegacionComponent,
    ImagenPipe,
    TextoPipe,
    HoraPipe,
    EditarPerfilComponent,
    NoticiasComponent,
    PieComponent,
    CookieComponent,
    ImgPipe
  ],
})
export class SharedModule {}
