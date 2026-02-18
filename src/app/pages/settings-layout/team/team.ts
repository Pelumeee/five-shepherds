import { Component, OnInit, inject, signal } from '@angular/core';
import { TeamCard } from './components/team-card/team-card';
import { AppUser } from '../../../shared/models/appUser';
import { User } from '../../../core/services/user';
import { NewUser } from './components/new-user/new-user';
import { UserCreationFlowService } from '../../../core/services/user-creation-flow-service';

@Component({
  selector: 'app-team',
  imports: [TeamCard, NewUser],
  templateUrl: './team.html',
})
export class Team implements OnInit {
  flow = inject(UserCreationFlowService);
  user = inject(User);
  users = signal<AppUser[]>([]);
  loading = signal(true);


  async ngOnInit() {
    this.users.set(await this.user.getAllUsers());
    console.log(this.users);
    this.loading.set(false);
  }

  showAddMemberForm() {
    this.flow.startCreate();
  }

  closeDialog() {
    this.flow.reset();
  }
}
