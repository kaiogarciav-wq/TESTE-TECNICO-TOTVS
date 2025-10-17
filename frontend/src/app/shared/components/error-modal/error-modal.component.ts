// src/app/shared/components/error-modal/error-modal.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.scss']
})
export class ErrorModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ErrorModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string, showRetry: boolean }
  ) {}

  onClose(): void {
    this.dialogRef.close(false); // Indica que o modal foi fechado sem tentar novamente
  }

  onRetry(): void {
    this.dialogRef.close(true); // Indica que o botão de "Tentar Novamente" foi clicado
  }
}
