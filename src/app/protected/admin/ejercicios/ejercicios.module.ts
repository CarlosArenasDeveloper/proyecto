import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EjerciciosRoutingModule } from './ejercicios-routing.module';
import { ListaEjerciciosComponent } from './lista-ejercicios/lista-ejercicios.component';
import { EditEjercicioComponent } from './edit-ejercicio/edit-ejercicio.component';
import { AddEjercicioComponent } from './add-ejercicio/add-ejercicio.component';
import { SharedModule } from '../../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material/material.module';
import { DataTablesModule } from 'angular-datatables';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [ListaEjerciciosComponent, EditEjercicioComponent, AddEjercicioComponent],
  imports: [
    CommonModule,
    EjerciciosRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MaterialModule,
    DataTablesModule,
    TranslateModule
  ],
  exports:[ListaEjerciciosComponent, EditEjercicioComponent, AddEjercicioComponent]
})
export class EjerciciosModule { }
