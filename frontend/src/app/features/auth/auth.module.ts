// src/app/features/auth/auth.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // << Adicione ReactiveFormsModule se usar formulários reativos

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    LoginComponent // Componentes declarados neste módulo
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule, // Para [(ngModel)] em formulários de template
    ReactiveFormsModule // Para formulários reativos (FormControl, FormGroup)
  ]
  // Não precisa de providers aqui, pois AuthService já é fornecido no CoreModule
})
export class AuthModule { }