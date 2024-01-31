import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class accesoGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const bandera = localStorage.getItem('bandera');
    
    if (bandera === 'true') {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  tipoActive(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const tipo = localStorage.getItem('idtipo');
    if(tipo === '2') {
      return true;
    }else{
      this.router.navigate(['/perfil']);
      return false;
    }
  }
  
}
