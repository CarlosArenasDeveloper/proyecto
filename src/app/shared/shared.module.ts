import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavegacionComponent } from './navegacion/navegacion.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { ImagenPipe } from './pipes/imagen.pipe';
import { TextoPipe } from './pipes/texto.pipe';



@NgModule({
  declarations: [NavegacionComponent, ImagenPipe, TextoPipe],
  imports: [
    CommonModule,
    RouterModule, MaterialModule ],
  exports:[
    NavegacionComponent,
    ImagenPipe,
    TextoPipe,  
  ]
})
export class SharedModule { }
