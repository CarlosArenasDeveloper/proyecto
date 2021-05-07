import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActividadesRoutingModule } from './actividades-routing.module';
import { ListaActividadesComponent } from './lista-actividades/lista-actividades.component';
import { AddActividadComponent } from './add-actividad/add-actividad.component';
import { EditActividadComponent } from './edit-actividad/edit-actividad.component';
import { SharedModule } from '../../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material/material.module';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [ListaActividadesComponent, AddActividadComponent, EditActividadComponent],
  imports: [
    CommonModule,
    ActividadesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MaterialModule,
    DataTablesModule,
  ],
  exports:[ListaActividadesComponent, AddActividadComponent, EditActividadComponent]
})
export class ActividadesModule { }
