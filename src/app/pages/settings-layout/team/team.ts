import { Component } from '@angular/core';
import { TeamCard } from "./components/team-card/team-card";

@Component({
  selector: 'app-team',
  imports: [TeamCard],
  templateUrl: './team.html',
})
export class Team {

}
