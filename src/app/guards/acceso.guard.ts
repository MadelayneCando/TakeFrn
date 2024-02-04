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
      if (tipo === '15') {
        // bandera true y tipo = 1
        const allowedRoutesForType1 = ['clases', 'instructores', 'perfil', 'usuarios'];
        if (allowedRoutesForType1.includes(state.url.split('/')[1])) {
          return true;
        } else {
          this.router.navigate(['/perfil']); 
          return false;
        }
      } else {
        // bandera= true y tipo != 1
        const allowedRoutesForTypeNot1 = ['compracreditos', 'perfil'];
        if (allowedRoutesForTypeNot1.includes(state.url.split('/')[1])) {
          return true;
        } else {
          this.router.navigate(['/perfil']); 
          return false;
        }
      }
    } else {
      // bandera =false
      this.router.navigate(['/login']);
      return false;
    }
  }
}