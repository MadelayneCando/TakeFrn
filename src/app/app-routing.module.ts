import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { EquipoComponent } from './equipo/equipo.component';
import { CompracreditosComponent } from './compracreditos/compracreditos.component';
import { PerfilComponent } from './perfil/perfil.component';
import { accesoGuard } from './guards/acceso.guard';
import { RecuperarComponent } from './recuperar/recuperar.component';
import { HorarioComponent } from './horario/horario.component';
import { CitaComponent } from './cita/cita.component';
import { InstructoresComponent } from './instructores/instructores.component';
import { ClasesComponent } from './clases/clases.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { AyudaComponent } from './ayuda/ayuda.component';

const routes: Routes = [ 
  {path: 'home', component:HomeComponent},
  {path: 'navbar', component:NavbarComponent},
  {path: 'footer', component:FooterComponent},
  {path: 'login', component:LoginComponent},
  {path: 'register', component:RegisterComponent},
  {path:'categorias', component:CategoriasComponent},
  {path: 'equipo', component:EquipoComponent},  
  {path: 'recuperar', component:RecuperarComponent},
  {path: 'horario', component:HorarioComponent},
  {path: 'compracreditos', component:CompracreditosComponent, canActivate:[accesoGuard]}, //AÑADE MADE
  {path: 'cita', component:CitaComponent, canActivate:[accesoGuard]}, //AÑADE MADE
  {path: 'instructores', component:InstructoresComponent, canActivate:[accesoGuard]}, //AÑADE MADE
  {path: 'clases', component:ClasesComponent, canActivate:[accesoGuard]}, //AÑADE MADE
  {path: 'usuarios', component:UsuariosComponent, canActivate:[accesoGuard]}, //AÑADE MADE
  {path: 'perfil', component:PerfilComponent, canActivate:[accesoGuard]},
  {path: '**', pathMatch: 'full',redirectTo:'home'},
  {path: 'ayuda', component: AyudaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
