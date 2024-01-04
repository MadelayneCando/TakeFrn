import { Component, OnInit, ChangeDetectorRef, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../services/backend.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-compracreditos',
  templateUrl: './compracreditos.component.html',
  styleUrls: ['./compracreditos.component.css']
})

export class CompracreditosComponent implements OnInit {
  EndBusqueda: string = '';
  
  creditos:any[]=[]; 

  constructor(private router: Router, private route: ActivatedRoute, private changeDetectorRef: ChangeDetectorRef, private injector:Injector) { }

  idusuario = localStorage.getItem('idusuario');
  creditoac:number=0;

  puntajeF: number = 0;
  comprado: number = 0;
  user_email = localStorage.getItem('user_email');


  ngOnInit(): void {
    this.comprado=0;
    this.obtenerCreditos();
    const cred = localStorage.getItem('user_creditos');  
    if(cred!==null){
      this.creditoac=Number(cred);
    }else{
      this.creditoac=0;
    }    
  }

  obtenerCreditos(){
    const creditoServices = this.injector.get(BackendService);
    creditoServices.getCreditos().subscribe((result)=>{
      this.creditos = result;      
    },
    (error)=>{
      console.error(error);
    })
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
  
  compraCreditos(idcreditos: number) {
    const creditoServices = this.injector.get(BackendService);
    const idusuario = Number(this.idusuario);
  
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres confirmar esta compra?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Realiza la compra solo si el usuario confirma
        creditoServices.comprarCreditos(idusuario, idcreditos).subscribe((result) => {
      
          Swal.fire('Compra realizada!', 'Tu compra ha sido procesada correctamente.', 'success');
          setTimeout(function () {
            window.location.href='/perfil';}, 90000);
            if(idcreditos===2){
              this.creditoac+=60;
              localStorage.setItem('user_creditos', this.creditoac.toString());  
              this.comprado=1;            
            }else if(idcreditos===3){
              this.creditoac+=120;
              localStorage.setItem('user_creditos', this.creditoac.toString());              
              this.comprado=1; 
            }else if(idcreditos===4){
              this.creditoac+=250;
              localStorage.setItem('user_creditos', this.creditoac.toString());
              this.comprado=1; 
            }
        }, (error) => {
          console.error(error);
          Swal.fire('Error', 'Hubo un problema al procesar la compra.', 'error');
        });
      } else {
        Swal.fire('Compra cancelada', 'Tu compra ha sido cancelada.', 'error');
      }
    });
  }
  
  cerrarVentanaEmergente() {
    const ventanaEmergente = document.getElementById('ventanaEmergente');
    if (ventanaEmergente) {
      ventanaEmergente.style.display = 'none';
    }
  }
} 