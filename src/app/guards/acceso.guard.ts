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
        // Si bandera es true y tipo es 1, permitir el acceso a ciertas rutas
        const allowedRoutesForType1 = ['clases', 'instructores', 'perfil', 'usuarios'];
        if (allowedRoutesForType1.includes(state.url.split('/')[1])) {
          return true;
        } else {
          // Redirigir a otra ruta si intenta acceder a una ruta no permitida para tipo 1
          this.router.navigate(['/perfil']); // Puedes ajustar la ruta de redirección según tus necesidades
          return false;
        }
      } else {
        // Si bandera es true y tipo no es 1, permitir el acceso solo a compracreditos y perfil
        const allowedRoutesForTypeNot1 = ['compracreditos', 'perfil'];
        if (allowedRoutesForTypeNot1.includes(state.url.split('/')[1])) {
          return true;
        } else {
          // Redirigir a otra ruta si intenta acceder a una ruta no permitida para tipo no 1
          this.router.navigate(['/perfil']); // Puedes ajustar la ruta de redirección según tus necesidades
          return false;
        }
      }
    } else {
      // Redirigir a la página de inicio de sesión si bandera no es true
      this.router.navigate(['/login']);
      return false;
    }
  }
}