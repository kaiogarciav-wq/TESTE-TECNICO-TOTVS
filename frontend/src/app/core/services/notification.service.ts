// ng g s core/services/notification --module=core
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

export interface ToastMessage {
  type: 'success' | 'error' | 'info';
  message: string;
  duration?: number; // em ms, opcional
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private _toastSubject = new Subject<ToastMessage>();
  public readonly toast$: Observable<ToastMessage> = this._toastSubject.asObservable();

  constructor() { }

  success(message: string, duration?: number): void {
    this._toastSubject.next({ type: 'success', message, duration });
  }

  error(message: string, duration?: number): void {
    this._toastSubject.next({ type: 'error', message, duration });
  }

  info(message: string, duration?: number): void {
    this._toastSubject.next({ type: 'info', message, duration });
  }
}