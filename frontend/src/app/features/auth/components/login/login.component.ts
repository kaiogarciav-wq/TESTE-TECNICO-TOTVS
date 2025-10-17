import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service'; // Ajuste o caminho se necessário

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  returnUrl!: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService // Seu serviço de autenticação
  ) {
    // Redireciona para a página inicial se já estiver logado
    if (this.authService.isAuthenticated()) { // ou this.authService.isAuthenticated$.pipe(take(1)).subscribe(...)
      this.router.navigate(['/']); // Ou para a rota de dashboard
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.required]], // <-- Mudado de 'username' para 'email'
      password: ['', Validators.required]
    });

    // Obtém o URL de retorno dos parâmetros de consulta ou define o padrão como '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // Getter para fácil acesso aos campos do formulário
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // Para de continuar se o formulário for inválido
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.login({
      username: this.f.username.value, // <-- Mudado de 'username' para 'email'
      password: this.f.password.value
    })
    .subscribe({
      next: () => {
        this.router.navigateByUrl(this.returnUrl);
      },
      error: error => {
        this.error = 'Login falhou. Verifique seu email e senha.'; // Mensagem genérica para segurança
        this.loading = false;
        console.error('Login error:', error);
      }
    });
  }
}