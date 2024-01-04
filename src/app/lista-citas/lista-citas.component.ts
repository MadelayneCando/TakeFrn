import { Component, Injector, OnInit } from '@angular/core';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-lista-citas',
  templateUrl: './lista-citas.component.html',
  styleUrls: ['./lista-citas.component.css']
})
export class ListaCitasComponent {

  instructores:any[]= [];
  entrenamientos:any[]= [];
  usuarios: any[]= [];
  identrenamientoSeleccionado:string = '';
  mostrarFormulario: boolean=false;
  user_email = localStorage.getItem('user_email');

  constructor(private injector:Injector){  }

  ngOnInit(){
    this.obtenerEntrenamientos();
    if(this.user_email){
      this.verUsuarioPorClase(this.user_email);
    }
    
  }

  mostrarFormulario1(){
    this.mostrarFormulario=true;
  }

  obtenerEntrenamientos(): void{  
    const entrenamientoService = this.injector.get(BackendService);
    entrenamientoService.getEntrenamiento().subscribe((result)=>{
      this.entrenamientos = result;
    },
    (error)=>{ 
      console.error(error); 
    } 
    )
  }
  
  verUsuarioPorClase(user_email:string){
    const citaServices = this.injector.get(BackendService);
    citaServices.verUsuarioPorClase(user_email).subscribe((result)=>{
      this.usuarios = result;
      console.log(result);
    },
    (error)=>{ 
      console.error(error);
    } 
    )
  }

  obtenerInstructores(){
    const instructoresService = this.injector.get(BackendService);
    instructoresService.getInstructores().subscribe((result)=>{
      this.instructores = result;
    },
    (error)=>{
      console.error(error);
    }
    )
  }

}
