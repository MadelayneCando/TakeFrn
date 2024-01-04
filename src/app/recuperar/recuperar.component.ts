import { Component, Injector } from '@angular/core';
import { BackendService } from '../services/backend.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.css']
})
export class RecuperarComponent {

  correo: string='';
  clave: string='';
  claveconf: string='';

  user: any[]=[]; 

  email:string ='';
  preg1:string ='';
  preg2:string ='';
  preg3:string ='';

  passwordErrorMessage: string = ""; 
  confirmPasswordErrorMessage: string = ""; 
  passwordValid: boolean = true; 
  confirmPasswordValid: boolean = true; 

  constructor(private injector: Injector){}

  recuperarClave(){
    const email = this.email;
    const preg1 = this.preg1;
    const preg2 = this.preg2;
    const preg3 = this.preg3;
    const recuperarService = this.injector.get(BackendService);
    recuperarService.recuperarContraseña(email, preg1, preg2, preg3).subscribe((result)=>{   
      this.mostrarVentanaEmergente(email);
    },
    (error)=>{
      console.error(error);
      Swal.fire("Error", "No Se recuperó", "error");
    } 
    )    
  }

  mostrarVentanaEmergente(email: string) {
    console.log('email:', email);
    const ventanaEmergente = document.getElementById('ventanaEmergente');
    if (ventanaEmergente) {
      ventanaEmergente.style.display = 'block';
    }
  }

  cambiarClave(email:string, clave:string){
    console.log(email, clave);
    const cambiarService = this.injector.get(BackendService);
    cambiarService.cambioClave(email, clave).subscribe((result)=>{      
      Swal.fire("Correcto", "Se recuperó", "success"); 
      setTimeout(function () {
        location.reload(); // Esto recargará la página después de 1 segundo
    }, 1000);
    },
    (error)=>{
      console.error(error);
      Swal.fire("Error", "No Se recuperó", "error");
    }
    
    )   
  }

  

  cerrarVentanaEmergente() {
    const ventanaEmergente = document.getElementById('ventanaEmergente');
    if (ventanaEmergente) {
      ventanaEmergente.style.display = 'none';
    }
  }


  validatePassword() {
    this.passwordValid = this.clave.length >= 8;
    this.passwordValid = this.passwordValid && /[A-Z]/.test(this.clave);
    this.passwordValid = this.passwordValid && /\d/.test(this.clave);
    this.passwordValid = this.passwordValid && /[!@#$%^&*()_+[\]{};':"\\|,.<>/?]+/.test(this.clave);
    this.passwordErrorMessage = this.passwordValid ? "" : "La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial.";
    this.confirmPasswordValid = this.clave === this.claveconf;
    this.confirmPasswordErrorMessage = this.confirmPasswordValid ? "" : "";
    
  }
}