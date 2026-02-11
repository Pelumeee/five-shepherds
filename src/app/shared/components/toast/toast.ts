import { Component, inject } from '@angular/core';
import { ToastService } from '../../../core/services/toast';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-toast',
  imports: [NgClass],
  templateUrl: './toast.html',
})
export class Toast {
  toast = inject(ToastService);

  get bgClass() {
    switch (this.toast.type()) {
      case 'success':
        return 'bg-green-600';
      case 'error':
        return 'bg-red-600';
      case 'info':
        return 'bg-blue-600';
      default:
        return 'bg-gray-800';
    }
  }
}
