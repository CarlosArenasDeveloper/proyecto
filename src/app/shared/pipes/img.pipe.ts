import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'img'
})
export class ImgPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    return  "http://www.iestrassierra.net/alumnado/curso2021/DAW/daw2021a2/assets/"+value
  }

}
