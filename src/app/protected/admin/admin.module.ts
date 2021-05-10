import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { TarifasModule } from './tarifas/tarifas.module';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { DataTablesModule } from 'angular-datatables';
import { ClientesModule } from './clientes/clientes.module';
import { MonitoresModule } from './monitores/monitores.module';
import { CentrosModule } from './centros/centros.module';
import { MusculosModule } from './musculos/musculos.module';
import { EjerciciosModule } from './ejercicios/ejercicios.module';
import { ActividadesModule } from './actividades/actividades.module';
import { CategoriasModule } from './categorias/categorias.module';
import { SalasModule } from './salas/salas.module';
import { NoticiasModule } from './noticias/noticias.module';
import { SesionesModule } from './sesiones/sesiones.module';
import { ListaclientesComponent } from './clientes/listaclientes/listaclientes.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    MaterialModule,
    DataTablesModule,
    TarifasModule,
    ClientesModule,
    MonitoresModule,
    CentrosModule,
    MusculosModule,
    EjerciciosModule,
    ActividadesModule,
    CategoriasModule,
    SalasModule,
    NoticiasModule,
    SesionesModule
  ],
  exports:[]
})
export class AdminModule { }
