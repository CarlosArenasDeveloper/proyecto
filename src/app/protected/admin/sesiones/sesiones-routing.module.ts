import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaSesionesComponent } from './lista-sesiones/lista-sesiones.component';
import { AddSesionComponent } from './add-sesion/add-sesion.component';
import { EditSesionComponent } from './edit-sesion/edit-sesion.component';

const routes: Routes = [
  {path:'',component: ListaSesionesComponent},
  {path:'add-sesion',component:AddSesionComponent},
  {path:'edit-sesion/:id',component:EditSesionComponent},
  {path:'**',redirectTo:''}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SesionesRoutingModule { }
