import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaclientesComponent } from './listaclientes/listaclientes.component';
import { AltaclienteComponent } from './altacliente/altacliente.component';
import { EditclienteComponent } from './editcliente/editcliente.component';

const routes: Routes = [
  { path: '', component: ListaclientesComponent },
  { path: 'altacliente', component: AltaclienteComponent },
  { path: 'editcliente/:email', component: EditclienteComponent },
  { path: '**', redirectTo:'' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
