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
      if (tipo === '1') {
        // Si tipo es 1, permitir el acceso solo a estas rutas
        const allowedRoutesForType2 = ['instructores', 'clases', 'usuarios'];
        if (allowedRoutesForType2.includes(state.url.split('/')[1])) {
          return true;
        } else {
          // Redirigir a otra ruta si intenta acceder a una ruta no permitida para tipo 2
          this.router.navigate(['/perfil']);
          return false;
        }
      } else {
        // Permitir el acceso a todas las rutas si tipo no es 2
        return true;
      }
    } else {
      // Redirigir a la página de inicio de sesión si bandera no es true
      this.router.navigate(['/login']);
      return false;
    }
  }
}