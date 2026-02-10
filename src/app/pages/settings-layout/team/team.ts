import { Component, OnInit, inject, signal } from '@angular/core';
import { TeamCard } from './components/team-card/team-card';
import { AppUser } from '../../../shared/models/appUser';
import { User } from '../../../core/services/user';
import { NewUser } from './components/new-user/new-user';

@Component({
  selector: 'app-team',
  imports: [TeamCard, NewUser],
  templateUrl: './team.html',
})
export class Team implements OnInit {
  user = inject(User);
  users = signal<AppUser[]>([]);
  loading = signal(true);

  showAddMemberForm = signal(false);

  async ngOnInit() {
    this.users.set(await this.user.getAllUsers());
    console.log(this.users);
    this.loading.set(false);
  }

  showAddMemberFromBtn() {
    this.showAddMemberForm.set(true);
  }

  closeDialog() {
    this.showAddMemberForm.set(false);
  }
}
