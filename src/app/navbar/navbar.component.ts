import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
    window.location.href='/perfil';
    // this.router.navigate(['/perfil']);
  }

  constructor(private router: Router){}

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
}