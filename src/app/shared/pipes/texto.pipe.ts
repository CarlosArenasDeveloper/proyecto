import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'texto'
})
export class TextoPipe implements PipeTransform {

  transform(texto: string): unknown {

    const frase = texto.split("");
    const longitud= frase.length;
    if(longitud>150){
        texto= texto.slice(0,150)+ " ...."
    }
    return texto;
  }

}
