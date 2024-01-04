import { Component, ElementRef, ViewChild } from '@angular/core';
import axios from 'axios';
import Swal from 'sweetalert2';  
import { remota } from 'src/conexion';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  @ViewChild('user_contraseña') passwordInput!: ElementRef;

  passwordVisible = false;

  togglePasswordVisibility() {
    const passwordField = this.passwordInput.nativeElement;

    if (this.passwordVisible) {
      passwordField.type = 'password';
    } else {
      passwordField.type = 'text';
    }

    this.passwordVisible = !this.passwordVisible;
  }
  
  user_email: string='';
  user_contraseña: string='';
  mostrarPag=true;


  constructor(private router:Router){}

  inicioSesion(){
    console.log("...");
    const url = remota + '/api/validarcorreo'; 
    const datos = {
      user_email: (<HTMLInputElement>document.querySelector('#user_email')).value,
      user_contraseña: (<HTMLInputElement>document.querySelector('#user_contraseña')).value
    } 
    axios.post(url, datos).then(response=> {console.log('Respuesta: ', response.data)
    localStorage.setItem('user_cedula', response.data.usuario.user_cedula);
    localStorage.setItem('user_nombre', response.data.usuario.user_nombre);
    localStorage.setItem('user_apellido', response.data.usuario.user_apellido);
    localStorage.setItem('user_email', response.data.usuario.user_email);
    localStorage.setItem('user_telefono', response.data.usuario.user_telefono);
    localStorage.setItem('user_direccion', response.data.usuario.user_direccion);
    localStorage.setItem('user_peso', response.data.usuario.user_peso);
    localStorage.setItem('user_altura', response.data.usuario.user_altura);
    localStorage.setItem('user_estado', response.data.usuario.user_estado);
    localStorage.setItem('user_creditos', response.data.usuario.user_creditosrestantes);
    localStorage.setItem('user_foto', response.data.usuario.user_foto);
    localStorage.setItem('idtipo', response.data.usuario.idtipo);
    localStorage.setItem('idusuario', response.data.usuario.idusuario);
    localStorage.setItem('bandera', "true");
    window.location.href='/perfil';
    // this.router.navigate(['/perfil']);
    
    console.log("Exito");
    })
    .catch(error=>{console.error('Error al iniciar sesion', error)
    Swal.fire("Error", "credenciales invalidas", "error");
    localStorage.setItem('bandera', "false");
    //localStorage.clear();
  });
  console.log("No");
  }


}