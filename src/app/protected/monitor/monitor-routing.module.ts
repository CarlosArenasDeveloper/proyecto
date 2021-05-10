import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonitorComponent } from './monitor.component';

const routes: Routes = [
  {
    path: '',
    component: MonitorComponent,
  },
  {
    path: 'listaclientes',
    loadChildren: () =>
      import('./../admin/clientes/clientes.module').then((m) => m.ClientesModule),
  },
  {
    path: 'listamonitores',
    loadChildren: () =>
      import('./../admin/monitores/monitores.module').then((m) => m.MonitoresModule),
  },
  {
    path: 'ejercicios',
    loadChildren: () =>
      import('./../admin/ejercicios/ejercicios.module').then((m)=>m.EjerciciosModule)
  },
  {
    path: 'musculos',
    loadChildren: () =>
      import('./../admin/musculos/musculos.module').then((m)=>m.MusculosModule)
  },
  {
    path: 'actividades',
    loadChildren: () =>
      import('./../admin/actividades/actividades.module').then((m)=>m.ActividadesModule)
  },
  {
    path: 'salas',
    loadChildren: () =>
      import('./../admin/salas/salas.module').then((m)=>m.SalasModule)
  },
  {
    path: 'sesiones',
    loadChildren: () =>
      import('./../admin/sesiones/sesiones.module').then((m)=>m.SesionesModule)
  },
  {
    path: 'tarifas',
    loadChildren: () =>
      import('./../admin/tarifas/tarifas.module').then((m)=>m.TarifasModule)
  }, {
    path: 'centros',
    loadChildren: () =>
      import('./../admin/centros/centros.module').then((m)=>m.CentrosModule)
  },
  {
    path: 'categorias',
    loadChildren: () =>
      import('./../admin/categorias/categorias.module').then((m) => m.CategoriasModule),
  },
  {
    path: 'noticias',
    loadChildren: () =>
      import('./../admin/noticias/noticias.module').then((m) => m.NoticiasModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonitorRoutingModule { }
