import {
  Component,
  ElementRef,
  Input,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-mini-mapa',
  templateUrl: './mini-mapa.component.html',
  styles: [
    `
      div {
        width: 100%;
        height: 150px;
        margin: 0px;
      }
    `,
  ],
})
export class MiniMapaComponent implements AfterViewInit {
 // @Input() lngLat: [number, number] = [0, 0];
  @Input() longitud!: number;
  @Input() latitud!:number;

  @ViewChild('mapa') divMapa!: ElementRef;
  constructor() {}

  ngAfterViewInit(): void {

    let lngLat: [number, number]=[this.longitud,this.latitud]
    
    const mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: lngLat,
      zoom: 16,
      interactive:true
    });

    new mapboxgl.Marker().setLngLat(lngLat).addTo(mapa);
  }
}
