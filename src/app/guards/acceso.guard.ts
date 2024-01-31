import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class accesoGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const bandera = localStorage.getItem('bandera');
    const tipo = localStorage.getItem('idtipo');

    if (bandera === 'true') {
      if (tipo === '2') {
        const allowedRoutesForType2 = ['instructores', 'clases', 'usuarios'];
        if (allowedRoutesForType2.includes(state.url.split('/')[1])) {
          return true;
        } else {
          this.router.navigate(['/perfil']);
          return false;
        }
      } else {
        return true;
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
