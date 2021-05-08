import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavegacionComponent } from './navegacion/navegacion.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { ImagenPipe } from './pipes/imagen.pipe';
import { TextoPipe } from './pipes/texto.pipe';
import { HoraPipe } from './pipes/hora.pipe';



@NgModule({
  declarations: [NavegacionComponent, ImagenPipe, TextoPipe, HoraPipe],
  imports: [
    CommonModule,
    RouterModule, MaterialModule ],
  exports:[
    NavegacionComponent,
    ImagenPipe,
    TextoPipe,  
    HoraPipe
  ]
})
export class SharedModule { }
