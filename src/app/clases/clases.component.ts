import { Component, Injector } from '@angular/core';
import { BackendService } from '../services/backend.service';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { remota } from 'src/conexion';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.component.html',
  styleUrls: ['./clases.component.css']
})
export class ClasesComponent {

  instructores:any[]= [];
  entrenamientos:any[]= []; 
  clases: any[] = [];
  identrenamientoSeleccionado:string = '';
  idinstructorSeleccionado:string = '';

  cupos:Number=0;
  precio: number=0;
  hora: string='';
  descripcion:string='';

  idclase:number=0;
  identrenador:number=0;
  identrenamiento:number=0;
  fecha:string='';
  precred:number=0;
  cla_hora:string='';
  cla_descrip:string=''; 
  cla_cupo:number=0;

  ahora: any;
  fecupo: any;

  constructor(private injector:Injector, private http:HttpClient){}

  ngOnInit(){
    this.obtenerEntrenamientos();
    this.obtenerInstructores();
    this.obtenerClases();
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

  obtenerInstructores(): void{  
    const instructoresServices = this.injector.get(BackendService);
    instructoresServices.getInstructores().subscribe((result)=>{
      this.instructores = result;
    },
    (error)=>{
      console.error(error); 
    } 
    )
  }

  cambiaEstadoClase(idclase: number){
    console.log(idclase);
    const estadoService = this.injector.get(BackendService);
    estadoService.modificarClaseEstado(idclase).subscribe((result)=>{
      Swal.fire("Cambio", "Se ha cambiado el estado de la clase", "success").then((result)=>{
        location.reload();
      });      
    },
    (error)=>{
      console.error(error); 
      Swal.fire("Error", "No se ha cambiado el estado de la clase", "error")
    } 
    )
  }

  obtenerClases(){
    const claseService = this.injector.get(BackendService);
    claseService.getClases().subscribe((result)=>{
      this.clases = result;
    }, 
    (error)=>{
      console.error(error);
    }
    )
  } 

  guardarCita(){
    const entrenamientoSeleccionado = Number(this.identrenamientoSeleccionado);
    console.log(entrenamientoSeleccionado);
    const instructorSeleccionado = Number(this.idinstructorSeleccionado);
    console.log(instructorSeleccionado);
    const fecha = this.fecupo;
    const precio = Number(this.precio);
    const hora = this.hora;
    const descrip = this.descripcion;
    const cupo = Number(this.cupos);
    const claseService = this.injector.get(BackendService);
    claseService.crearClase(entrenamientoSeleccionado, instructorSeleccionado,fecha, precio, hora, descrip, cupo ).subscribe((result)=>{
      Swal.fire("¡Correcto!", "Se ha creado la clase", "success");      
      this.cerrarVentanaEmergente1();    
    },
    (error)=>{
      Swal.fire("Error", "No se ha creado la clase", "error");      
      this.cerrarVentanaEmergente1();    
    })
  }

  private modificarClases(idclase:number, identrenador:number, identrenamiento:number, cla_fecha:string, cla_preciocreditos: number,
    cla_hora:string, cla_descripcion:string, cla_cupo: number){
      if(idclase && identrenador && identrenamiento && cla_fecha && cla_preciocreditos && cla_hora && cla_descripcion && cla_cupo){
        const url= remota + "/api/updateClassSect";
        const datos = { 
          p_idclase:idclase,
          p_identrenador:identrenador,
          p_identrenamiento:identrenamiento,
          p_cla_fecha:cla_fecha,
          p_cla_preciocreditos:cla_preciocreditos,
          p_cla_hora:cla_hora,
          p_cla_descripcion:cla_descripcion,
          p_cla_cupo:cla_cupo
        }
        console.log(datos);
        this.http.put(url, datos).subscribe(
          (response)=>{
            const clases = this.clases.find((clase)=>clase.idclase===idclase);
            clases.idclase=idclase,
            clases.identrenador=identrenador,
            clases.identrenamiento=identrenamiento,
            clases.cla_fecha=cla_fecha,
            clases.cla_preciocreditos=cla_preciocreditos,
            clases.cla_hora=cla_hora,
            clases.cla_descripcion=cla_descripcion,
            clases.cla_cupo=cla_cupo
            console.log("Cambios realizados");
          },
          (error)=>{
            Swal.fire("error", "No ha sido modificado", "error");
          }
          );
      }    
  }

  actualizar(){
    this.modificarClases(this.idclase, this.identrenador, this.identrenamiento, this.fecha, this.precred, this.cla_hora,
      this.cla_descrip, this.cla_cupo);
      Swal.fire("Correcto", "Clase modificada con éxito", "success");
      this.cerrarVentanaEmergente();
  }

mostrarVentanaEmergente(idclase: number) {
    console.log('Idclase:', idclase);
    const registro = this.clases.find(clases => clases.idclase === idclase);
    this.idclase = registro.idclase;
    this.identrenador = registro.identrenador;
    this.identrenamiento = registro.identrenamiento;
    this.fecha = registro.cla_fecha;
    this.precred = registro.cla_preciocreditos;
    this.cla_hora = registro.cla_hora;
    this.cla_descrip = registro.cla_descripcion;
    this.cla_cupo = registro.cla_cupo;

    const ventanaEmergente = document.getElementById('ventanaEmergente2');
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

  cerrarVentanaEmergente(): void {
    const ventanaEmergente = document.getElementById('ventanaEmergente2');
    if (ventanaEmergente) {
      ventanaEmergente.style.display = 'none';
    }
  }

  cerrarVentanaEmergente1(): void {
    const ventanaEmergente = document.getElementById('ventanaEmergente');
    if (ventanaEmergente) {
      ventanaEmergente.style.display = 'none';
    }
  }
}