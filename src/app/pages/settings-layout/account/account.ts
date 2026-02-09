import { Component, inject } from '@angular/core';
import { Session } from '../../../core/services/session';

@Component({
  selector: 'app-account',
  imports: [],
  templateUrl: './account.html',
})
export class Account {
  session = inject(Session);

  get user() {
    return this.session.user;
  }
}
