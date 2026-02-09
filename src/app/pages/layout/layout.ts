import { Component, effect, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Sidebar } from '../../shared/components/sidebar/sidebar';
import { Header } from '../../shared/components/header/header';
import { Session } from '../../core/services/session';

@Component({
  selector: 'app-layout',
  imports: [Sidebar, Header, RouterOutlet],
  templateUrl: './layout.html',
})
export class Layout {
  private session = inject(Session);
  private router = inject(Router);

  constructor() {
    effect(() => {
      if (!this.session.loading() && !this.session.user()) {
        this.router.navigate(['/auth']);
      }
    });
  }
}
