import { Component, output, input } from '@angular/core';
import { ToggleInput } from '../toggle-input/toggle-input';

interface Notis {
  id: string;
  title: string;
  description: string;
  isEnabled: boolean;
}

@Component({
  selector: 'app-notification',
  imports: [ToggleInput],
  templateUrl: './notification.html',
})
export class Notification {
  notisObj = input<Notis>();
  notisChange = output<Notis>();

  toggleEnabled(enabled: boolean) {
    const current = this.notisObj();
    if (!current) return;

    this.notisChange.emit({
      ...current,
      isEnabled: enabled,
    });
  }
}
