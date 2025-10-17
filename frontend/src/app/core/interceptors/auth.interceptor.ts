// src/app/core/interceptors/auth.interceptor.ts
import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment'; // Importe o environment

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  // Usamos 'private authService: AuthService' diretamente no constructor
  // e Angular cuidará da injeção. Não é necessário 'injector.get()'.
  // Se for usar injector.get, precisa ser Lazy-loaded para evitar circular dependency.
  // Para interceptors, é comum injetar diretamente o serviço.
  constructor(private authService: AuthService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    const isApiUrl = request.url.startsWith(environment.apiUrl);

    // Identifica se a requisição é para login ou registro
    const isLoginOrRegisterRequest = request.url.includes('/Auth/login') || request.url.includes('/Auth/register');

    console.log('AuthInterceptor: Requisição para:', request.url);
    console.log('AuthInterceptor: Token obtido do AuthService:', token ? token.substring(0, 30) + '...' : 'Nenhum');

    // Adiciona o token APENAS se houver um token, for uma URL da API
    // E NÃO for uma requisição de login ou registro
    if (token && isApiUrl && !isLoginOrRegisterRequest) {
      request = this.addToken(request, token);
      console.log('AuthInterceptor: Adicionando cabeçalho Authorization.');
    } else if (isLoginOrRegisterRequest) {
        console.log('AuthInterceptor: Requisição de Login/Registro, token não adicionado.');
    } else {
        console.log('AuthInterceptor: Nenhum token encontrado ou não é uma URL da API, não adicionando cabeçalho Authorization.');
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && isApiUrl && !isLoginOrRegisterRequest) { // Adicione isApiUrl e !isLoginOrRegisterRequest aqui também
          console.error('AuthInterceptor: Erro 401 detectado em uma rota protegida, fazendo logout...');
          this.authService.logout();
          this.router.navigate(['/auth/login']); // Redireciona para a rota de login correta
        } else if (error.status === 403 && isApiUrl && !isLoginOrRegisterRequest) {
          console.error('AuthInterceptor: Erro 403 detectado (Forbidden), redirecionando para home...');
          this.router.navigate(['/']); // Ou para uma página de "acesso negado"
        }
        return throwError(() => error);
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}