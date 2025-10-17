import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';     // Importar CoreModule
import { SharedModule } from './shared/shared.module'; // Importar SharedModule

// REMOVA:
// import { AuthInterceptor } from './core/interceptors/auth.interceptor'; 
// import { AuthService } from './core/auth/auth.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,           
    BrowserAnimationsModule,    
    CoreModule,                 // Importe o CoreModule AQUI. Ele já fornecerá AuthService e AuthInterceptor.
    SharedModule                
  ],
  providers: [
    // REMOVA AuthService daqui. Ele deve ser fornecido apenas no CoreModule.
    // REMOVA qualquer configuração de HTTP_INTERCEPTORS daqui. Ela deve ser feita no CoreModule.
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }