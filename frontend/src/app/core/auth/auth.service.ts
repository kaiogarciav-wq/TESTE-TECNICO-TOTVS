import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserLogin, LoginResponse, UserRegister} from './auth.model';
// Agora auth.model.ts deve ser encontrado!
import type { AuthModule } from 'src/app/features/auth/auth.module';

const CURRENT_USER_KEY = 'currentUser'; // Uma constante para a chave do localStorage

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/Auth`;
  private currentUserSubject: BehaviorSubject<LoginResponse | null>;
  public currentUser: Observable<LoginResponse | null>;

  // Novo BehaviorSubject para o estado de autenticação, para ser reativo
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasCurrentUser());
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    const storedUser = localStorage.getItem(CURRENT_USER_KEY);
    const initialUser = storedUser ? JSON.parse(storedUser) : null;
    this.currentUserSubject = new BehaviorSubject<LoginResponse | null>(initialUser);
    this.currentUser = this.currentUserSubject.asObservable();

    // Sincroniza o isAuthenticatedSubject com o estado inicial do usuário
    this.isAuthenticatedSubject.next(!!initialUser);
  }

  private hasCurrentUser(): boolean {
    return !!localStorage.getItem(CURRENT_USER_KEY);
  }

  public get currentUserValue(): LoginResponse | null {
    return this.currentUserSubject.value;
  }

  public getToken(): string | null {
    return this.currentUserValue?.token || null;
  }

  // Este método isAuthenticated() não é mais usado externamente se você usar isAuthenticated$
  // mas pode ser útil internamente ou para verificações síncronas rápidas.
  public isAuthenticated(): boolean {
    return !!this.getToken();
  }

  public isAdmin(): boolean {
    return this.currentUserValue?.role === 'Admin';
  }

  login(credentials: UserLogin): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        if (response && response.token) {
          localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(response));
          this.currentUserSubject.next(response);
          this.isAuthenticatedSubject.next(true); // Atualiza o estado de autenticação
          console.log('Login bem-sucedido. Usuário salvo:', response);
        } else {
          console.error('Login failed: Token not found in response.', response);
          throw new Error('Login failed: Token not found in response.');
        }
      }),
      catchError(error => {
        console.error('Login failed:', error);
        this.isAuthenticatedSubject.next(false); // Garante que o estado seja falso em caso de erro
        return throwError(() => error);
      })
    );
  }

  register(userData: UserRegister): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/register`, userData).pipe(
      tap(response => {
        if (response && response.token) {
          localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(response));
          this.currentUserSubject.next(response);
          this.isAuthenticatedSubject.next(true); // Atualiza o estado de autenticação
          console.log('Registro bem-sucedido. Usuário salvo:', response);
        } else {
          console.error('Registration failed: Token not found in response.', response);
          throw new Error('Registration failed: Token not found in response.');
        }
      }),
      catchError(error => {
        console.error('Registration failed:', error);
        this.isAuthenticatedSubject.next(false); // Garante que o estado seja falso em caso de erro
        return throwError(() => error);
      })
    );
  }

  logout() {
    localStorage.removeItem(CURRENT_USER_KEY);
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false); // Atualiza o estado de autenticação para falso
    console.log('Usuário deslogado. Dados removidos.');
    this.router.navigate(['/auth/login']);
  }
}