import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error' | 'info';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  message = signal<string | null>(null);
  type = signal<ToastType>('success');
  visible = signal(false);

  show(message: string, type: ToastType = 'success', duration = 3000) {
    if (this.visible()) {
      this.hide();
    }
    this.message.set(message);
    this.type.set(type);
    this.visible.set(true);

    setTimeout(() => {
      this.hide();
    }, duration);
  }

  hide() {
    this.visible.set(false);
  }
}
