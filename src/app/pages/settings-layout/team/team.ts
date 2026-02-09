import { Component, OnInit, inject, signal } from '@angular/core';
import { TeamCard } from './components/team-card/team-card';
import { AppUser } from '../../../shared/models/appUser';
import { User } from '../../../core/services/user';

@Component({
  selector: 'app-team',
  imports: [TeamCard],
  templateUrl: './team.html',
})
export class Team implements OnInit {
  user = inject(User);
  users = signal<AppUser[]>([]);
  loading = signal(true);

  async ngOnInit() {
    this.users.set(await this.user.getAllUsers());
    console.log(this.users);
    this.loading.set(false);
  }
}
