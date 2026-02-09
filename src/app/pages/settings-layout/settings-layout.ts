import { Component, inject, computed } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Session } from '../../core/services/session';

@Component({
  selector: 'app-settings-layout',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './settings-layout.html',
})
export class SettingsLayout {
  session = inject(Session);

  showTeamMembers = computed(() => {
    return this.session.user()?.role === 'admin';
  });
}
