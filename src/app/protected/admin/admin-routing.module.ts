import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
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
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
