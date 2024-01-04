import { Component, Injector } from '@angular/core';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css']
})
export class HorarioComponent {

  
  clases:any[]= [];

  constructor(private injector:Injector){  }

  ngOnInit(){
    this.obtenerClasesSemanales();    
  }

  obtenerClasesSemanales(){
    const clasesServices = this.injector.get(BackendService);
    clasesServices.obtenerClaseSemanales().subscribe((result)=>{
      this.clases = result;
    },
    (error)=>{
      console.error(error);
    }
    )
  } 


}
