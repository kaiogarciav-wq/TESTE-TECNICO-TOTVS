// src/app/core/auth/auth.model.ts
export interface UserLogin {
  username: string; // <-- Mude de 'email' para 'username'
  password: string;
}

export interface UserRegister {
  username: string; // <-- Se o registro também usa 'username', ajuste aqui
  email?: string; // Opcional, se o registro também coletar email
  password: string;
  // Adicione outros campos de registro aqui, se houver
}

export interface LoginResponse {
  token: string;
  refreshToken?: string;
  role: string;
  userId: string;
  username: string; // <-- Se o backend retorna 'username' após o login
  email?: string; // Opcional
  // ...
}