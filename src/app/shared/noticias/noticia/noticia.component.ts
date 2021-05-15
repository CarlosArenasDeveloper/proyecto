import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Noticia } from 'src/app/models/interface';
import { AdminService } from 'src/app/protected/services/admin.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.css'],
})
export class NoticiaComponent implements OnInit {
  noticia: Noticia = {};

  constructor(
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.adminService.getNoticiaPorIdInicio(id)))
      .subscribe((noticia) => {
        this.noticia = noticia;
        console.log(this.noticia);
      });
  }

  sesion(): boolean {
    if (sessionStorage.getItem('usuario')) {
      return true;
    }
    return false;
  }
}
