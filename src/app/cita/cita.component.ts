import { Component, Injector, OnInit } from '@angular/core';
import { BackendService } from '../services/backend.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-cita',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.css']
})

export class CitaComponent implements OnInit{

  instructores:any[]= [];
  entrenamientos:any[]= [];
  usuarios: any[]= [];
  identrenamientoSeleccionado:string = '';

  cupos:Number=0;
  precio: number=0;
  hora: string=''; 
  id:number=0;

  creditosactuales:number=0;
  
  bandera:boolean=false;

  idusuario = localStorage.getItem('idusuario');
  user_creditos = localStorage.getItem('user_creditos');  
  cred = Number(this.user_creditos);

  puntajeF: number = 0;
  comprado: number = 0;
  user_email = localStorage.getItem('user_email');

  ahora: any;
  fecupo: any;

  /*CAMBIOS MADE

  mostrarPerfil:boolean=false;
  mostrarFormulario:boolean=false;
  //CAMBIOS MADE*/

  mostrarPerfil = false;
  mostrarFormulario: boolean=false;


  mostrarPerfilUsuario() {
    this.mostrarFormulario = false;
    this.mostrarPerfil = true;
  }

  constructor(private injector:Injector){  }

  ngOnInit(){
    this.comprado=0;
    this.obtenerEntrenamientos();
    const dataPite = new DatePipe('en-Us')
    this.ahora = dataPite.transform(new Date(), 'yyyy-MM-dd')
    /*if(this.mostrarFormulario==false){
      if(this.user_email!==null){
        this.verUsuarioPorClase(this.user_email);
      }
    } */       
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

  verificarClase() {
    const fecha = (document.getElementById('fecha') as HTMLInputElement).value;
    console.log(fecha);
    const valorSeleccionado = Number(this.identrenamientoSeleccionado);
    console.log(valorSeleccionado);
    const claseService = this.injector.get(BackendService);
    claseService.verificarClase(valorSeleccionado, fecha).subscribe(
        (result) => {
            if (Array.isArray(result)) {
                if (result.length > 0) {
                    for (const clase of result) {
                        this.cupos = clase.clase_cupo;
                        this.precio = Number(clase.clase_preciocreditos);
                        this.hora = clase.clase_hora;  
                        this.id = clase.clase_id;   
                        const idclase = String(this.id);
                        localStorage.setItem('idclase', idclase); //subir idclase a local storage
                    }    
                    this.bandera = true;
                } else {
                    this.bandera = false;
                    Swal.fire("Mensaje", "No hay clase", "info");
                }
            } else {
                if (result ==="No hay clase") {
                    this.bandera = false;
                    Swal.fire("Mensaje", "No hay clase", "info");
                } else {
                    
                }
            }
        },
        (error) => {
            Swal.fire("Error", "Esta clase no se encuentra disponible", "warning");
            console.error(error);
        }
    );
  }

  guardarCita(){
    const idusuario= Number(this.idusuario);  
    const id = this.id;
    const email_usuario = this.user_email;
    if(this.cred >= this.precio) {
      const citaServices = this.injector.get(BackendService);
      citaServices.guardarClase(idusuario, id ).subscribe((result)=>{     
      this.creditosactuales=this.cred-this.precio;  
      localStorage.setItem("user_creditos", this.creditosactuales.toString());     
      /*//this.verUsuario(this.id);  MAYBE
      if (this.user_email) {
        this.verUsuarioPorClase(this.user_email);
      } else {
        // Manejar el caso cuando this.user_email es null o undefined
        console.error('this.user_email está vacío');
      }*/
      Swal.fire("Correct", "Se encuentra agendado", "success");
      this.comprado =1;
      setTimeout(function () {
        //location.reload();
        10000 
    });
      },
      (error)=>{
        //console.error(error);
        Swal.fire("Error", "Ya se encuentra agendado en la clase", "error");    
      } 
      )
    }else{
      Swal.fire("Error", "No cuenta con los créditos necesarios", "error");     
    }    
  }
  /* YA NO VALE XD
  verUsuario(id: number){
    const citaServices = this.injector.get(BackendService);
    citaServices.verUsuario(id).subscribe((result)=>{
      this.usuarios = result;
    },
    (error)=>{
      console.error(error);
    } 
    )
  }*/


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

  registrarPuntuacion(){
    const comentario = ((document.getElementById('comentario') as HTMLInputElement))!.value;
    console.log(comentario);
    const puntuacionServices = this.injector.get(BackendService);
    const correo_usuario = String(this.user_email);
    puntuacionServices.guardarPuntuacion(correo_usuario, comentario, this.puntajeF).subscribe((result)=>{
      console.log(result);
    }, (error)=>{
      console.error(error);
    })
    this.cerrarVentanaEmergente();
  }

  cerrarVentanaEmergente() {
    const ventanaEmergente = document.getElementById('ventanaEmergente');
    if (ventanaEmergente) {
      ventanaEmergente.style.display = 'none';
    }
  }

  verPuntuaje(nombreP: string){
    switch (nombreP) {
      case 'rating-opt5':
        this.puntajeF = 5;
        break;
      case 'rating-opt4':
        this.puntajeF = 4;
        break;
      case 'rating-opt3':
        this.puntajeF = 3;
        break;
      case 'rating-opt2':
        this.puntajeF = 2;
        break;
      case 'rating-opt1':
        this.puntajeF = 1;
        break;
    }
  }
}
