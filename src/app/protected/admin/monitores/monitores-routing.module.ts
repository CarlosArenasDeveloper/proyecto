import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListamonitoresComponent } from './listamonitores/listamonitores.component';
import { AltamonitorComponent } from './altamonitor/altamonitor.component';
import { EditmonitorComponent } from './editmonitor/editmonitor.component';


const routes: Routes = [
  { path: '', component: ListamonitoresComponent },
  { path: 'altamonitor', component: AltamonitorComponent },
  { path: 'editmonitor/:email', component: EditmonitorComponent },
  { path: '**', redirectTo:'' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonitoresRoutingModule { }
