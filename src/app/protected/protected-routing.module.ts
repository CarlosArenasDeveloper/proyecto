import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DataTablesModule } from 'angular-datatables';
import { NoticiasComponent } from '../shared/noticias/noticias.component';
import { CentrosComponent } from '../shared/centros/centros.component';
import { ActividadesComponent } from '../shared/actividades/actividades.component';
import { EjerciciosComponent } from '../shared/ejercicios/ejercicios.component';
import { ReservasComponent } from '../shared/reservas/reservas.component';
import { NoticiaComponent } from '../shared/noticias/noticia/noticia.component';
import { ActividadComponent } from '../shared/actividades/actividad/actividad.component';
import { MusculoComponent } from '../shared/ejercicios/musculo/musculo.component';
import { EjercicioComponent } from '../shared/ejercicios/ejercicio/ejercicio.component';
import { AdminGuard } from './admin/guards/admin.guard';
import { ClienteGuard } from './cliente/guards/cliente.guard';
import { MonitorGuard } from './monitor/guards/monitor.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'noticias',
        component: NoticiasComponent,
      },
      { path: 'noticias/:id', component: NoticiaComponent },

      {
        path: 'noticias',
        component: NoticiasComponent,
      },
      {
        path: 'centros',
        component: CentrosComponent,
      },
      {
        path: 'actividades',
        component: ActividadesComponent,
      },
      {
        path: 'actividades/:id',
        component: ActividadComponent,
      },
      {
        path: 'ejercicios',
        component: EjerciciosComponent,
      },
      {
        path: 'ejercicios/:nombre',
        component: MusculoComponent,
      },
      {
        path: 'ejercicios/:nombre/:id',
        component: EjercicioComponent,
      },
      {
        path: 'reservas',
        component: ReservasComponent,
      },
      {
        path: 'admin',
        //component: AdminComponent,
        loadChildren: () =>
          import('./admin/admin.module').then((m) => m.AdminModule),
          canLoad: [ AdminGuard ],
          canActivate: [ AdminGuard ]
      },
      {
        path: 'monitor',
        //component: AdminComponent,
        loadChildren: () =>
          import('./monitor/monitor.module').then((m) => m.MonitorModule),
          canLoad: [ MonitorGuard ],
          canActivate: [ MonitorGuard ]
      },
      {
        path: 'cliente',
        //component: AdminComponent,
        loadChildren: () =>
          import('./cliente/cliente.module').then((m) => m.ClienteModule),
          canLoad: [ ClienteGuard ],
          canActivate: [ ClienteGuard ]
      },

      { path: '**', redirectTo: '' },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes), DataTablesModule],
  exports: [RouterModule],
})
export class ProtectedRoutingModule {}
