import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import axios from 'axios';
import { remota } from 'src/conexion';


@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private  backendUrl = remota;
  constructor(private http: HttpClient) { }


  guardarUsuario(cedula:string, nombre:string, apellid:string, email:string, telefono:string, 
    direccion:string, peso: number, altura:number, contraseña:string, u_preg1:string, u_preg2:string, u_preg3:string){
    return this.http.post(`${this.backendUrl}/api/register`, {
      user_cedula: cedula,
      user_nombre: nombre,
      user_apellido: apellid,
      user_email: email,
      user_telefono: telefono,
      user_direccion: direccion,
      user_peso: peso,
      user_altura: altura,
      user_contraseña: contraseña,
      preg1: u_preg1,
      preg2: u_preg2,
      preg3: u_preg3
    });
  }

  guardarClase(idusuario: number, idclase:number){
    return this.http.post(`${this.backendUrl}/api/agregarClase`, {
      idusuario: idusuario,
      idclase: idclase
    }); 
  }

  guardarPuntuacion(correo_usuario:string, comentario:string, puntuacion:number){
    return this.http.post(`${this.backendUrl}/api/registropuntuacion`, {
      correo_usuario: correo_usuario,
      comentario: comentario,
      puntuacion: puntuacion
    });
  }

  crearClase(p_identrenamiento: number, p_identrenador: number, p_cla_fecha: string, p_cla_preciocreditos:number,
    p_cla_hora: string, p_cla_descripcion: string, p_cla_cupo: number){
      return this.http.post(`${this.backendUrl}/api/createClase`, {
        p_identrenamiento: p_identrenamiento, 
        p_identrenador: p_identrenador, 
        p_cla_fecha: p_cla_fecha,  
        p_cla_preciocreditos:p_cla_preciocreditos, 
        p_cla_hora: p_cla_hora, 
        p_cla_descripcion: p_cla_descripcion, 
        p_cla_cupo: p_cla_cupo
      });
  }

  verificarClase(identramiento: number, fecha:string){
    console.log("Llego clase ");  
    return this.http.post(`${this.backendUrl}/api/verificarClases`,{
      identrenamiento: identramiento, 
      cla_fecha: fecha
    }); 
  }

  verUsuario(idclase: number): Observable<any[]> {
    return new Observable<any[]>((observer) => {
      axios
        .post(`${this.backendUrl}/api/verUsuarios`, { idclase: idclase})
        .then((response) => {
          //console.log(response.data); ajam eso no e xd
          observer.next(response.data);
          observer.complete();
        }) 
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  verUsuarioPorClase(email_usuario:string): Observable<any[]> {
    return new Observable<any[]>((observer) => {
      axios
        .post(`${this.backendUrl}/api/usuarioPorClase`, { email_usuario: email_usuario})
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        }) 
        .catch((error) => {
          observer.error(error);
        });
    });
  }


  modificarUsuario(email:string, cedula:string, nombre:string, apellid:string, telefono:string, 
    direccion:string, peso: number, altura:number){
    return this.http.put(`${this.backendUrl}/api/actualizar`, {      
      user_email: email,
      user_cedula: cedula,
      user_nombre: nombre,
      user_apellido: apellid,
      user_telefono: telefono,
      user_direccion: direccion,
      user_peso: peso,
      user_altura: altura
    });
  }

  modificarInstructores(cedula: string, nombre: string, apellid: string, 
    telefono:string, direccion:string, sueldo:number, descripcion: string){
      return this.http.put(`${this.backendUrl}/api/actualizari`, {      
        en_cedula: cedula,
        en_nombre: nombre,
        en_apellido: apellid,
        en_telefono: telefono,
        en_direccion: direccion,
        en_sueldo: sueldo,
        en_descrpcion: descripcion
      });
  }

  modificarClaseEstado(idclase:number){
    return this.http.put(`${this.backendUrl}/api/cambiaClase`,{  
      id:idclase    
    });
  }

  modificarUsuarioEstado(user_email:string){
    return this.http.put(`${this.backendUrl}/api/cambiarUsuario`,{  
      p_user_email:user_email    
    });
  }

  eliminarInstructores(cedula:string){
    return this.http.delete(`${this.backendUrl}/api/deleteins/`+cedula,{      
    });
  } 

  verficarUsuario(email1: string, contraseña1: string) {  
    return this.http.post(`${this.backendUrl}/api/validarcorreo`,{
      user_email: email1, user_contraseña: contraseña1
    });
  }  



  comprarCreditos(idusuario:number, idcredito:number){
    return this.http.post(`${this.backendUrl}/api/comprarCreditos`, {      
      idusuario: idusuario, idcreditos: idcredito 
    });    
  }

  getInstructores(): Observable<any[]> {
    return new Observable<any[]>((observer) => {
      axios
        .get(`${this.backendUrl}/api/listarins`, {})
        .then((response) => {
          //console.log(response.data); ajam eso no e xd
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  getEntrenamiento(): Observable<any[]> {
    return new Observable<any[]>((observer) => {
      axios
        .get(`${this.backendUrl}/api/listarEntrenamientos`, {})
        .then((response) => {
          //console.log(response.data);
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }  

  getEspecializacion(): Observable<any[]> {
    return new Observable<any[]>((observer) => {
      axios
        .get(`${this.backendUrl}/api/listarEspecializacion`, {})
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  getCreditos(): Observable<any[]> {
    return new Observable<any[]>((observer) => {
      axios
        .get(`${this.backendUrl}/api/listc`, {})
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  getClases(): Observable<any[]> {
    return new Observable<any[]>((observer) => {
      axios
        .get(`${this.backendUrl}/api/getClase`, {})
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  getUsuarios(): Observable<any[]> {
    return new Observable<any[]>((observer) => {
      axios
        .get(`${this.backendUrl}/api/list`, {})
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }


  obtenerClaseSemanales(): Observable<any[]> {
    return new Observable<any[]>((observer) => {
      axios
        .get(`${this.backendUrl}/api/obtenerClase`, {})
        .then((response) => {
          //console.log(response.data); ajam eso no e xd
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  recuperarContraseña(email:string, u_preg1:string, u_preg2:string, u_preg3:string){
    return this.http.post(`${this.backendUrl}/api/validarRecuperacion`, {
      user_email: email,
      preg1: u_preg1,
      preg2: u_preg2,
      preg3: u_preg3
    });
  }

  cambioClave(email:string, nueva_clave:string){
    return this.http.post(`${this.backendUrl}/api/cambioClave`, {
      user_email: email,
      nueva_clave: nueva_clave
    });
  }


  guardarInstructores(idespecializacion:number, cedula:string, nombre:string, apellid:string, telefono:string, 
    direccion:string,  sueldo:number, descripcion:string, foto: string){
    return this.http.post(`${this.backendUrl}/api/crearins`, {
      p_idespecializacion :idespecializacion,
      p_en_cedula: cedula,
      p_en_nombre: nombre,
      p_en_apellido: apellid,
      p_en_telefono: telefono,
      p_en_direccion: direccion,
      p_en_sueldo: sueldo,
      p_en_descripcion: descripcion,
      p_en_foto: foto      
    });
  }

}
