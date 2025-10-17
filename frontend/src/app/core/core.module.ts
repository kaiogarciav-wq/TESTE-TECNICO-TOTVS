import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; // Importe HTTP_INTERCEPTORS aqui

import { AuthService } from './auth/auth.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';
// import { ErrorInterceptor } from './interceptors/error.interceptor'; // Se você tiver outros interceptors

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule // Necessário se os serviços fornecidos neste módulo usarem HttpClient
  ],
  providers: [
    AuthService, // Forneça o AuthService como um singleton
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true // Permite múltiplos interceptors na cadeia
    }
    // Se tiver outros interceptors, adicione-os aqui, por exemplo:
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: ErrorInterceptor,
    //   multi: true
    // }
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule já foi carregado. Importe-o apenas no AppModule.');
    }
  }
}