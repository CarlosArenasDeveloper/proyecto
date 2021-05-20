import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanLoad,
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Usuario } from '../../../models/interface';

@Injectable({
  providedIn: 'root',
})
export class MonitorGuard implements CanActivate, CanLoad {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (!sessionStorage.getItem('usuario')) {
      return this.router.navigateByUrl('/');
    }

    const usuario: Usuario = JSON.parse(sessionStorage.getItem('usuario')!);
    const role = usuario.role;

    if (role == 1) {
      return this.router.navigateByUrl('dashboard/admin');
    } else if (role == 2) {
      return this.router.navigateByUrl('dashboard/cliente');
    }
    return true;
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (!sessionStorage.getItem('usuario')) {
      return this.router.navigateByUrl('/');
    }

    const usuario: Usuario = JSON.parse(sessionStorage.getItem('usuario')!);
    const role = usuario.role;
    if (role == 1) {
      return this.router.navigateByUrl('dashboard/admin');
    } else if (role == 2) {
      return this.router.navigateByUrl('dashboard/cliente');
    }
    return true;
  }
}
