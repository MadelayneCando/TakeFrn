import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  bandera: boolean=false;
  nombre: string = '';
  dropdownVisible: boolean = false;

  menuAbierto: boolean = false;

  toggleMenu() {
    this.menuAbierto = !this.menuAbierto;
  }

  cerrarMenu() {
    this.menuAbierto = false;

  }

  constructor(private router: Router, private activatedRoute: ActivatedRoute){}

  ngOnInit(){

    this.bandera =localStorage.getItem('bandera')==='true';
    const nombreLocal = localStorage.getItem('user_nombre');
    const apellidoLocal = localStorage.getItem('user_apellido');
    if(nombreLocal!==null && apellidoLocal!==null){
      this.nombre = nombreLocal + ' ' + apellidoLocal;  
    }else{
      this.nombre ='';
    }
  }

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  cerrarSesion(){
    localStorage.clear();
    window.location.href="/login";
  }
  
  perfil(){
    this.router.navigate(['/perfil']);
  }

  navegarPerfil() {
    this.cerrarMenu(); 
    const currentRoute = this.activatedRoute.snapshot.routeConfig?.path;
    const isPerfilRoute = currentRoute === 'perfil'; 
    if (isPerfilRoute) {
      this.router.navigate(['/perfil']);
    } else {
  
      this.router.navigateByUrl('/perfil', { skipLocationChange: true });
    }
  }
}