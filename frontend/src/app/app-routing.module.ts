// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  // Redireciona a rota raiz para a lista de produtos se autenticado,
  // ou para o login se não autenticado.
  // IMPORTANTE: Este redirecionamento é simplificado e pode ser ajustado
  // dependendo de como você quer a experiência inicial do usuário.
  // O AuthGuard no 'products' já lidará com o redirecionamento para o login.
  { path: '', redirectTo: 'products', pathMatch: 'full' },

  // Rota para o módulo de autenticação (lazy-loaded)
  // Ex: /auth/login, /auth/register
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
  },

  // Rota para o módulo de produtos (lazy-loaded)
  // Protegida pelo AuthGuard. Se o usuário não estiver autenticado, o AuthGuard
  // irá redirecioná-lo para /auth/login.
  {
    path: 'products',
    loadChildren: () => import('./features/products/products.module').then(m => m.ProductsModule),
    canActivate: [AuthGuard] // Aplica o guarda de rota aqui
  },

  // Opcional: Rota para 404 Not Found (você precisaria criar um NotFoundComponent)
  // { path: '**', component: NotFoundComponent }
  // Ou, um redirecionamento simples para o início ou uma página de erro
  { path: '**', redirectTo: 'products' } // Redireciona qualquer rota não encontrada para 'products'
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }