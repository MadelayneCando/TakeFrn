import { Component, Injector } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { remota } from 'src/conexion';

@Component({
  selector: 'app-instructores',
  templateUrl: './instructores.component.html', 
  styleUrls: ['./instructores.component.css']
})

export class InstructoresComponent {

  instructores: any[]=[];  
  entrenamientos:any[]= []; 
  identrenamientoSeleccionado:string = ''; 


  cedula: string=''; 
  email:string='';
  nombre: string='';
  apellido: string='';
  telefono: string='';
  direccion: string='';
  descripcion: string='';
  sueldo: number=0;
  
  constructor(private injector:Injector, private backend: BackendService, private http:HttpClient){}
  
  ngOnInit() {
    this.obtenerInstructores();
    this.obtenerEntrenamientos(); 
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

  

  private modificarIns(cedula:string, nombre:string, apellido:string, telefono:string, 
    direccion:string, sueldo:number, descripcion:string){
      if(cedula && nombre && apellido && descripcion && telefono && direccion && sueldo){
        const url= remota + "/api/actualizari";
        const datos = { 
          en_cedula:cedula,
          en_nombre:nombre,
          en_apellido:apellido,
          en_telefono:telefono,
          en_direccion:direccion,
          en_sueldo:Number(sueldo),
          en_descripcion:descripcion
        }
        console.log(datos);
        this.http.put(url, datos).subscribe(
          (response)=>{
            const entrenador = this.instructores.find((instructor)=>instructor.en_cedula===cedula);
            entrenador.en_cedula=cedula,
            entrenador.en_nombre=nombre,
            entrenador.en_apellido=apellido,
            entrenador.en_telefono=telefono,
            entrenador.en_direccion=direccion,
            entrenador.en_sueldo=sueldo,
            entrenador.en_descripcion=descripcion;
            console.log("cambios realizados");
          },
          (error)=>{
            Swal.fire("error", "No ha sido modificado", "error");
          }
          );
      }    
  }

  actualizar(){
    this.modificarIns(this.cedula, this.nombre, this.apellido, 
      this.telefono, this.direccion, this.sueldo, this.descripcion);
      Swal.fire("Correcto", "Modificado con exito", "success");
      this.cerrarVentanaEmergente();
  }

  mostrarVentanaEmergente(cedula: number) {
    console.log('Cédula:', cedula);
    const registro = this.instructores.find(rutas => rutas.en_cedula === cedula);
    this.cedula = registro.en_cedula;
    this.nombre = registro.en_nombre;
    this.apellido = registro.en_apellido;
    this.telefono = registro.en_telefono;
    this.direccion = registro.en_direccion;
    this.sueldo = registro.en_sueldo;
    this.descripcion = registro.en_descripcion;

    const ventanaEmergente = document.getElementById('ventanaEmergente');
    if (ventanaEmergente) {
      ventanaEmergente.style.display = 'block';
    }
  }

  mostrarVentanaEmergenteIngreso() {
    const ventanaEmergente = document.getElementById('ventanaEmergente');
    if (ventanaEmergente) {
      ventanaEmergente.style.display = 'block';
    }
  }

  cerrarVentanaEmergente() {
    const ventanaEmergente = document.getElementById('ventanaEmergente');
    if (ventanaEmergente) {
      ventanaEmergente.style.display = 'none';
    }
  }

  eliminarIntructores(cedula:string){
    const instructoresService = this.injector.get(BackendService);
    console.log(cedula); 
    instructoresService.eliminarInstructores(cedula).subscribe((result)=>{
      Swal.fire("Correcto", "Se ha cambiado el estado con éxito", "success").then((result)=>{
        location.reload();
      });      
    },
    (error)=>{
      Swal.fire("Error", "No se ha cambiado el estado", "error");
    }
    )
  }
}
