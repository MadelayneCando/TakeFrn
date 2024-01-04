import { Component, Injector } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { BackendService } from '../services/backend.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil', 
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent { 

  cedula: string = '';
  nombre: string = '';
  apellido: string = '';
  email: string = '';
  telefono: string = '';
  direccion: string = '';
  peso: string = '';
  altura: string = '';
  estado: string = '';
  creditos: number = 0;
  foto: string = '';

  rol: number = 0;

  editing: boolean = false;

  mostrarComponenteInstructores = false;
  mostrarComponenteClases = false;
  mostrarComponenteUsuarios= false

  usuarios: any[]= [];

  mostrarPerfil= true; 
  mostrarFormularioAgendarCita=true;
  mostrarFormularioMostrarCita=true;
  id:number=0; 

  mostrarCita() {
    this.mostrarPerfil = false;
    this.mostrarFormularioAgendarCita=false;
    this.mostrarFormularioMostrarCita=true;
    localStorage.setItem('estadoFormulario','mostrar');
  }
  
  agendarCita(){
    this.mostrarPerfil = false;
    this.mostrarFormularioAgendarCita = true;
    this.mostrarFormularioMostrarCita=false;
    localStorage.setItem('estadoFormulario','ocultar');
  }

  constructor(private router: Router, private backend: BackendService, private injector:Injector) { }


  ngOnInit() { 
    const cedulaLocal = localStorage.getItem('user_cedula');
    const nombreLocal = localStorage.getItem('user_nombre');
    const apellidoLocal = localStorage.getItem('user_apellido');
    const emailLocal = localStorage.getItem('user_email');
    const telefonoLocal = localStorage.getItem('user_telefono');
    const direccionLocal = localStorage.getItem('user_direccion');
    const pesoLocal = localStorage.getItem('user_peso');
    const alturaLocal = localStorage.getItem('user_altura');
    const estadoLocal = localStorage.getItem('user_estado');
    const creditosLocal = localStorage.getItem('user_creditos');
    const fotoLocal = localStorage.getItem('user_foto');
    const credits = creditosLocal !== null ? parseInt(creditosLocal) : 0;

    const rolLocal = localStorage.getItem('idtipo');
    this.rol = rolLocal !== null ? parseInt(rolLocal) : 0;

    if (cedulaLocal !== null && nombreLocal !== null && apellidoLocal !== null && emailLocal !== null && telefonoLocal !== null && direccionLocal !== null
      && pesoLocal !== null && alturaLocal !== null && estadoLocal !== null && credits !== null && fotoLocal !== null) {
      this.cedula = cedulaLocal;
      this.nombre = nombreLocal; 
      this.apellido = apellidoLocal;
      this.email = emailLocal;
      this.telefono = telefonoLocal;
      this.direccion = direccionLocal;
      this.peso = pesoLocal;
      this.altura = alturaLocal;
      this.estado = estadoLocal;
      this.creditos = credits;
      this.foto = fotoLocal;
    } else {
      this.cedula = 'undefined';
      this.nombre = 'undefined';
      this.apellido = 'undefined';
      this.email = 'undefined';
      this.telefono = 'undefined';
      this.direccion = 'undefined';
      this.peso = 'undefined';
      this.altura = 'undefined';
      this.estado = 'undefined';
      this.creditos = 0;
      this.foto = 'undefined';
    }
  }

  limpiarLocal() {
    localStorage.clear();
    const currentUrl = this.router.url; // Obtener la URL actual
    this.router.navigateByUrl('/login', { skipLocationChange: true }).then(() => {
    this.router.navigate([currentUrl]); // Navegar a la URL actual para recargar la página
  });
  }

  toggleEditing() {
    if (this.editing) {
      this.modificarUsuario();
    }
    this.editing = !this.editing; // Cambia el estado de edición
  }

  modificarUsuario() {
    const user_cedula = ((document.getElementById('user_cedula') as HTMLInputElement))!.value;
    const user_nombre = ((document.getElementById('user_nombre') as HTMLInputElement))!.value;
    const user_apellido = ((document.getElementById('user_apellido') as HTMLInputElement))!.value;
    const user_email = ((document.getElementById('user_email') as HTMLInputElement))!.value;
    const user_telefono = ((document.getElementById('user_telefono') as HTMLInputElement))!.value;
    const user_direccion = ((document.getElementById('user_direccion') as HTMLInputElement))!.value;

    const pesoInput = document.getElementById('user_peso') as HTMLInputElement;
    const user_pesoString = pesoInput.value; // Esto es una cadena
    const user_peso = parseFloat(user_pesoString); // Convierte la cadena en número

    const alturaInput = document.getElementById('user_altura') as HTMLInputElement;
    const user_alturaString = alturaInput.value; // Esto es una cadena
    const user_altura = parseFloat(user_alturaString); // Convierte la cadena en número

    console.log("Modificando usuario...");
    this.backend.modificarUsuario(user_email, user_cedula, user_nombre, user_apellido, user_telefono, user_direccion,
      user_peso, user_altura).subscribe(
      (data: any) => {
        Swal.fire('Datos Modificados!', 'Tus datos se han modificado correctamente.', 'success');
      },
      (error: any) => {
        Swal.fire('Datos NO Modificados!', 'Tus datos no se han modificado.', 'error');
      }
    );
  }
  
  mostrarInstructores() {
    this.mostrarComponenteInstructores = true;
    this.mostrarComponenteClases = false;
    this.mostrarComponenteUsuarios=false;
  }

  mostrarClases() {
    this.mostrarComponenteInstructores = false;
    this.mostrarComponenteClases = true;
    this.mostrarComponenteUsuarios=false;
  }
  mostrarUsuarios() {
    this.mostrarComponenteInstructores = false;
    this.mostrarComponenteClases = false;
    this.mostrarComponenteUsuarios=true;
  }

  
  verUsuarioPorClase(){
    const idclase = Number(localStorage.getItem('idclase'));
    console.log(idclase);
    const citaServices = this.injector.get(BackendService);
    citaServices.verUsuario(idclase).subscribe((result)=>{
      this.usuarios = result;      
    },
    (error)=>{
      console.error(error);
    } 
    )
  }
  
}


