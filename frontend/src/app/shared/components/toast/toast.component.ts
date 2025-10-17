// ng g c shared/components/toast --module=shared
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { NotificationService, ToastMessage } from '../../../core/services/notification.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit, OnDestroy {
  messages: ToastMessage[] = [];
  private unsubscribe$ = new Subject<void>();

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.notificationService.toast$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(message => this.showToast(message));
  }

  showToast(message: ToastMessage): void {
    this.messages.push(message);
    setTimeout(() => this.removeToast(message), message.duration || 3000); // Default 3 segundos
  }

  removeToast(message: ToastMessage): void {
    this.messages = this.messages.filter(m => m !== message);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}