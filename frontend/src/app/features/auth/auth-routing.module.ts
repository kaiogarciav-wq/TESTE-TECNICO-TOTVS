// src/app/features/auth/auth-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  // Adicione outras rotas de autenticação aqui, como 'register', 'forgot-password', etc.
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // << Importante: forChild para módulos de feature
  exports: [RouterModule]
})
export class AuthRoutingModule { }