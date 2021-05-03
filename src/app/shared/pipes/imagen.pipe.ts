import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(imagen: string, ...args: unknown[]): unknown {
    if(imagen==null || imagen==""){
      return "imagen no disponible"
    }
    return imagen;
  }

}
