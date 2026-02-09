import { Component, input } from '@angular/core';
import { AppUser } from '../../../../../shared/models/appUser';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-team-card',
  imports: [DatePipe],
  templateUrl: './team-card.html',
})
export class TeamCard {
  user = input<AppUser>();
}
