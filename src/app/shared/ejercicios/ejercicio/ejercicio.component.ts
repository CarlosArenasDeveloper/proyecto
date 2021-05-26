import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, switchMapTo } from 'rxjs/operators';
import { AdminService } from '../../../protected/services/admin.service';
import { Ejercicio } from '../../../models/interface';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-ejercicio',
  templateUrl: './ejercicio.component.html',
  styleUrls: ['./ejercicio.component.css'],
})
export class EjercicioComponent implements OnInit {
  ejercicio: Ejercicio={};
  constructor(
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute,
    private _sanitizer: DomSanitizer

  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(switchMap(({ id }) => this.adminService.getEjercicioPorId(id)))
    .subscribe((ejercicio) => {
      this.ejercicio = ejercicio;
    });
  }
  getVideoIframe(url:any) {
    var video, results;
 
    if (url === null) {
        return '';
    }
    results = url.match('[\\?&]v=([^&#]*)');
    video   = (results === null) ? url : results[1];
 
    return this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + video);   
}

}
