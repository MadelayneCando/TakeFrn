import { Component, ElementRef, ViewChild } from '@angular/core';
import { BackendService } from '../services/backend.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

@ViewChild('password') passwordInput!: ElementRef;
@ViewChild('confirmpassword') confirmPasswordInput!: ElementRef;

  user_nombre: string = "";
  user_apellido: string = "";
  user_direccion: string = "";
  user_cedula: string = "";
  user_correo: string = "";
  user_telefono: string = "";
  user_password: string = ""; 
  user_confirmPassword: string = ""; 
  preg1: string = "";
  preg2: string = "";
  preg3: string = "";

  cedulaErrorMessage: string = "";
  correoErrorMessage: string = "";
  telefonoErrorMessage: string = "";
  passwordErrorMessage: string = ""; 
  confirmPasswordErrorMessage: string = ""; 
  
  nombreValid:boolean = true;
  apellidoValid:boolean = true;
  direccionValid:boolean = true;
  cedulaValid: boolean = true;
  correoValid: boolean = true; 
  telefonoValid: boolean = true;  
  passwordValid: boolean = true; 
  confirmPasswordValid: boolean = true; 
  preg1Valid: boolean = true; 
  preg2Valid: boolean = true; 
  preg3Valid: boolean = true; 

  passwordVisible: boolean = false;
  confirmPasswordVisible: boolean = false;

  showPassword = false;
  showConfirmPassword = false;

togglePasswordVisibility(field: string) {
  if (field === 'password') {
    this.showPassword = !this.showPassword;
  } else if (field === 'confirm-password') {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
} 

  setVacio(field: string) {
    const inputValue = ((document.getElementById(field) as HTMLInputElement))!.value;
    if (!inputValue) {
      ((document.getElementById(field) as HTMLInputElement))!.value = '0';
    }
  }
  
  validarCampo(campo: string) {
    switch (campo) {
      case 'nombre':
        this.nombreValid = !!this.user_nombre.trim();
        break;
      case 'apellido':
        this.apellidoValid = !!this.user_apellido.trim();
        break;
      case 'direccion':
        this.direccionValid = !!this.user_direccion.trim();
        break;
      case 'preg1':
        this.preg1Valid = !!this.preg1.trim();
        break;
      case 'preg2':
        this.preg2Valid = !!this.preg2.trim();
        break;
      case 'preg3':
        this.preg3Valid = !!this.preg3.trim();
        break;
      default:
        break;
    }
  }
    
  validateTelefono() {
    // Verificar que el teléfono tenga exactamente 10 dígitos
    this.telefonoValid = /^\d{10}$/.test(this.user_telefono);
    this.telefonoErrorMessage = this.telefonoValid ? "" : "El teléfono debe tener exactamente 10 dígitos.";
  }  
  validatePassword() {

    this.confirmPasswordValid = this.user_password === this.user_confirmPassword;
    this.confirmPasswordErrorMessage = this.confirmPasswordValid ? "" : "Las contraseñas no coinciden.";
  }

  validateCedula() {
    this.cedulaValid = /^\d{10}$/.test(this.user_cedula);
    this.cedulaErrorMessage = this.cedulaValid ? "" : "La cédula debe tener exactamente 10 dígitos numéricos.";
  }

  validateEmail() {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    this.correoValid = emailPattern.test(this.user_correo);
    this.correoErrorMessage = this.correoValid ? "" : "Ingresa un correo electrónico válido.";
  }

  constructor(private backend: BackendService, private el: ElementRef){}

enviarFormulario(){

    if (!this.user_cedula || !this.user_nombre || !this.user_apellido || !this.user_correo || !this.user_telefono || !this.user_direccion || !this.user_password || !this.user_confirmPassword) {
      alert("Todos los campos obligatorios deben estar llenos.");
      return; // Interrumpir la ejecución del método si hay campos vacíos
    }

    const user_cedula = ((document.getElementById('cedula') as HTMLInputElement))!.value;
    const user_nombre = ((document.getElementById('nombre') as HTMLInputElement))!.value;
    const user_apellido = ((document.getElementById('apellido') as HTMLInputElement))!.value;
    const user_email = ((document.getElementById('correo') as HTMLInputElement))!.value;
    const user_telefono = ((document.getElementById('telefono') as HTMLInputElement))!.value;
    const user_direccion = ((document.getElementById('direccion') as HTMLInputElement))!.value;

    const preg1 = ((document.getElementById('preg1') as HTMLInputElement))!.value;
    const preg2 = ((document.getElementById('preg2') as HTMLInputElement))!.value;
    const preg3 = ((document.getElementById('preg3') as HTMLInputElement))!.value;

    const pesoInput = document.getElementById('peso') as HTMLInputElement;
    const user_pesoString = pesoInput.value; // Esto es una cadena
    const user_peso = Number(user_pesoString); // Convierte la cadena en número
    
    const alturaInput = document.getElementById('altura') as HTMLInputElement;
    const user_alturaString = alturaInput.value; // Esto es una cadena
    const user_altura = Number(user_alturaString); // Convierte la cadena en número

    const user_contraseña = ((document.getElementById('password') as HTMLInputElement))!.value;    

    this.backend.guardarUsuario(user_cedula, user_nombre, user_apellido, user_email, user_telefono, user_direccion,
      user_peso, user_altura, user_contraseña, preg1, preg2, preg3).subscribe(
        (data: any) => {
          Swal.fire("Correcto", "¡Usuario registrado correctamente!", "success")
            .then(() => {
              setTimeout(() => {
                if (user_email) {
                  // Modifica dinámicamente el atributo 'action' del formulario
                  const formulario = document.getElementById('registroForm') as HTMLFormElement;
                  formulario.action = `https://formsubmit.co/${user_email}`;
            
                  // Envía el formulario
                  formulario.submit();
                } else {
                  // Maneja el caso en el que el campo de correo está vacío
                  console.error('El campo de correo electrónico está vacío');
                }
              }, 1000); 
            });
        },
        (error: any) => {
          Swal.fire("Error", "Hubo un error al guardar.", "error");
        }
      )    
  }
}