import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { EquipoComponent } from './equipo/equipo.component';
import { CompracreditosComponent } from './compracreditos/compracreditos.component';
import { PerfilComponent } from './perfil/perfil.component';
import { CitaComponent } from './cita/cita.component';
import { InstructoresComponent } from './instructores/instructores.component';
import { accesoGuard } from './guards/acceso.guard';
import { RecuperarComponent } from './recuperar/recuperar.component';
import { HorarioComponent } from './horario/horario.component';
import { ClasesComponent } from './clases/clases.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ImghomeComponent } from './imghome/imghome.component';
import { ListaCitasComponent } from './lista-citas/lista-citas.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    CategoriasComponent,
    EquipoComponent,
    CompracreditosComponent,
    PerfilComponent,
    CitaComponent,
    InstructoresComponent,
    RecuperarComponent,
    HorarioComponent,
    ClasesComponent,
    UsuariosComponent,
    ImghomeComponent,
    ListaCitasComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    accesoGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
