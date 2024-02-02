import { Component, OnInit, ChangeDetectorRef, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  
  EndBusqueda: string = '';

  instructores: any []= [];
  entrenamientos: any []= [];

  constructor(private router: Router, private route: ActivatedRoute, private changeDetectorRef: ChangeDetectorRef, private injector:Injector) { }

  ngOnInit(): void {
    this.obtenerInstructores();
    this.obtenerEntrenamientos();
  }

  //INTENTO CON BD
  obtenerInstructores(): void{
    const instructorServices = this.injector.get(BackendService);
    instructorServices.getInstructores().subscribe((result)=>{
      this.instructores = result;
    },
    (error)=>{
      console.error(error);
    }
    )
  }

  obtenerEntrenamientos(){
    const entrenamientoServices = this.injector.get(BackendService);
    entrenamientoServices.getEntrenamiento().subscribe((result)=>{
      this.entrenamientos = result;
    },
    (error)=>{
      console.error(error);
    }
    )
  }


}
