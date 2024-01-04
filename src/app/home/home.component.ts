import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
  rol: number = 0; 

  constructor(private router: Router, private backend: BackendService) { }
  
  ngOnInit() { 
    const rolLocal = localStorage.getItem('idtipo');
    this.rol = rolLocal !== null ? parseInt(rolLocal) : 0;
  }

  cerrarVentanaEmergente() {
    const ventanaEmergente = document.getElementById('ventanaEmergente');
    if (ventanaEmergente) {
      ventanaEmergente.style.display = 'none';
    }
  }

}