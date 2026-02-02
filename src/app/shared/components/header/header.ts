import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
})
export class Header {
  showMenu = signal<boolean>(false);

  toggleSubMenu() {
    this.showMenu.set(!this.showMenu());
  }
}
