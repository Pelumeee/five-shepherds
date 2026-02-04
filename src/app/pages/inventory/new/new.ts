import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Notification } from '../../settings-layout/preferences/components/notification/notification';

@Component({
  selector: 'app-new',
  imports: [Notification, RouterLink],
  templateUrl: './new.html',
})
export class New {
  testObj = {
    id: 'oo1',
    title: 'Use catalog images',
    description: 'Use default product images from catalog',
    isEnabled: true,
  };
}
