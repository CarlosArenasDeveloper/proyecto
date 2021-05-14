import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavegacionComponent } from './navegacion/navegacion.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { ImagenPipe } from './pipes/imagen.pipe';
import { TextoPipe } from './pipes/texto.pipe';
import { HoraPipe } from './pipes/hora.pipe';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';
import {  ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NavegacionComponent,
    ImagenPipe,
    TextoPipe,
    HoraPipe,
    EditarPerfilComponent,
  ],
  imports: [CommonModule, RouterModule, MaterialModule,ReactiveFormsModule],
  exports: [
    NavegacionComponent,
    ImagenPipe,
    TextoPipe,
    HoraPipe,
    EditarPerfilComponent,
  ],
})
export class SharedModule {}
