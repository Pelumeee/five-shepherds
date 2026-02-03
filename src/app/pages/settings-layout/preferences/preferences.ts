import { Component, signal } from '@angular/core';
import { Notification } from './components/notification/notification';

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  isEnabled: boolean;
}



@Component({
  selector: 'app-preferences',
  imports: [Notification],
  templateUrl: './preferences.html',
})
export class Preferences {
  notifications: NotificationSetting[] = [
    {
      id: 'email',
      title: 'Email notifications',
      description: 'Receive updates via email',
      isEnabled: true,
    },
    {
      id: 'sms',
      title: 'SMS notifications',
      description: 'Receive urgent alerts via SMS',
      isEnabled: false,
    },
    {
      id: 'order',
      title: 'Order alerts',
      description: 'Get notified about new orders',
      isEnabled: true,
    },
    {
      id: 'stock',
      title: 'Stock alerts',
      description: 'Get notified when inventory is running low',
      isEnabled: true,
    },
  ];
}
