// src/app/shared/shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ToastComponent } from './components/toast/toast.component';
import { ErrorModalComponent } from './components/error-modal/error-modal.component';
import { TruncatePipe } from './pipes/truncate.pipe';

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    ToastComponent,
    ErrorModalComponent, // <--- ADICIONADO AQUI
    TruncatePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoadingSpinnerComponent,
    ToastComponent,
    ErrorModalComponent, // <--- ADICIONADO AQUI TAMBÉM
    TruncatePipe
  ]
})
export class SharedModule { }