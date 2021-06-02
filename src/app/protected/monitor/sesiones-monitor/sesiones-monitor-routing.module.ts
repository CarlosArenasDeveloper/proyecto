import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaAllSesionesComponent } from './lista-all-sesiones/lista-all-sesiones.component';
import { ListaSesionesMonitorComponent } from './lista-sesiones-monitor/lista-sesiones-monitor.component';

const routes: Routes = [
  { path: '', component: ListaAllSesionesComponent },
  { path: 'mis-sesiones', component: ListaSesionesMonitorComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SesionesMonitorRoutingModule {}
