// ng g s core/services/loading --module=core
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private _isLoading = new BehaviorSubject<boolean>(false);
  public readonly isLoading$: Observable<boolean> = this._isLoading.asObservable();
  private _loadingRequestsCount = 0;

  constructor() { }

  startLoading(): void {
    this._loadingRequestsCount++;
    if (this._loadingRequestsCount === 1) {
      this._isLoading.next(true);
    }
  }

  stopLoading(): void {
    this._loadingRequestsCount--;
    if (this._loadingRequestsCount <= 0) {
      this._loadingRequestsCount = 0; // Garante que não fique negativo
      this._isLoading.next(false);
    }
  }
}