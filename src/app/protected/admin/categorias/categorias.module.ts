import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriasRoutingModule } from './categorias-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material/material.module';
import { DataTablesModule } from 'angular-datatables';
import { ListaCategoriasComponent } from './lista-categorias/lista-categorias.component';
import { AddCategoriaComponent } from './add-categoria/add-categoria.component';


@NgModule({
  declarations: [ListaCategoriasComponent, AddCategoriaComponent],
  imports: [
    CommonModule,
    CategoriasRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MaterialModule,
    DataTablesModule,
  ],
  exports:[ListaCategoriasComponent, AddCategoriaComponent]
})
export class CategoriasModule { }
