import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { EditarPerfilComponent } from '../../shared/editar-perfil/editar-perfil.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
  },
  {
    path:'editar-perfil/:email',
    component: EditarPerfilComponent
  },
  {
    path: 'tarifas',
    loadChildren: () =>
      import('./tarifas/tarifas.module').then((m) => m.TarifasModule),
  },
  {
    path: 'listaclientes',
    loadChildren: () =>
      import('./clientes/clientes.module').then((m) => m.ClientesModule),
  },
  {
    path: 'listamonitores',
    loadChildren: () =>
      import('./monitores/monitores.module').then((m) => m.MonitoresModule),
  },
  {
    path: 'centros',
    loadChildren: () =>
      import('./centros/centros.module').then((m) => m.CentrosModule),
  },
  {
    path: 'musculos',
    loadChildren: () =>
      import('./musculos/musculos.module').then((m) => m.MusculosModule),
  },
  {
    path: 'ejercicios',
    loadChildren: () =>
      import('./ejercicios/ejercicios.module').then((m) => m.EjerciciosModule),
  },
  {
    path: 'noticias',
    loadChildren: () =>
      import('./noticias/noticias.module').then((m) => m.NoticiasModule),
  },
  {
    path: 'categorias',
    loadChildren: () =>
      import('./categorias/categorias.module').then((m) => m.CategoriasModule),
  },
  {
    path: 'actividades',
    loadChildren: () =>
      import('./actividades/actividades.module').then((m) => m.ActividadesModule),
  },
  {
    path: 'sesiones',
    loadChildren: () =>
      import('./sesiones/sesiones.module').then((m) => m.SesionesModule),
  },
  {
    path: 'salas',
    loadChildren: () =>
      import('./salas/salas.module').then((m) => m.SalasModule),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
