import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(imagen: string, ...args: unknown[]): unknown {
    if(imagen==null || imagen==""){
      return ""
    }
    return  "http://www.iestrassierra.net/alumnado/curso2021/DAW/daw2021a2/assets/"+imagen
  }

}
