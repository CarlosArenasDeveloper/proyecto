import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'texto'
})
export class TextoPipe implements PipeTransform {

  transform(texto: string, ...args: unknown[]): unknown {
    
    return null;
  }

}
