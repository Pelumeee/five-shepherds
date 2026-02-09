import { Component, signal, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Session } from '../../../core/services/session';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
})
export class Header {
  showMenu = signal<boolean>(false);
  
  session = inject(Session);

  get userName() {
    return this.session.user()?.name;
  }

  get isAdmin() {
    return this.session.user()?.role === 'admin';
  }

  toggleSubMenu() {
    this.showMenu.set(!this.showMenu());
  }
}
