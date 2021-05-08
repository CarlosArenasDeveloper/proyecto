import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SesionesRoutingModule } from './sesiones-routing.module';
import { ListaSesionesComponent } from './lista-sesiones/lista-sesiones.component';
import { AddSesionComponent } from './add-sesion/add-sesion.component';
import { EditSesionComponent } from './edit-sesion/edit-sesion.component';
import { SharedModule } from '../../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material/material.module';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [ListaSesionesComponent, AddSesionComponent, EditSesionComponent],
  imports: [
    CommonModule,
    SesionesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MaterialModule,
    DataTablesModule,
  ],
  exports:[ListaSesionesComponent, AddSesionComponent, EditSesionComponent]
})
export class SesionesModule { }
