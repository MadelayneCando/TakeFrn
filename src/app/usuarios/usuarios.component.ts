import { Component, Injector } from '@angular/core';
import { BackendService } from '../services/backend.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {


  usuarios: any[]=[];

  constructor(private injector: Injector){}

  ngOnInit(){
    this.obtenerUsuarios();
  }

  obtenerUsuarios(): void{  
    const usuarioService = this.injector.get(BackendService);
    usuarioService.getUsuarios().subscribe((result)=>{
      this.usuarios = result;
    },
    (error)=>{
      console.error(error); 
    } 
    )
  }

  cambiaEstadoUsuario(user_email: string){
    console.log(user_email);
    const estadoService = this.injector.get(BackendService);
    estadoService.modificarUsuarioEstado(user_email).subscribe((result)=>{
      Swal.fire("¡Cambio de Estado!", "Se ha cambiado el estado del usuario", "success").then((result)=>{
        location.reload();
      });      
    },
    (error)=>{
      console.error(error); 
      Swal.fire("¡Error!", "No se ha logrado cambiar el estado del usuario, por favor inténtelo nuevamente", "error")
    } 
    )
  }

}
