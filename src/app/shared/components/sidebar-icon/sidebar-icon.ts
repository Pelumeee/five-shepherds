import { Component, input } from '@angular/core';

@Component({
  selector: 'app-sidebar-icon',
  imports: [],
  templateUrl: './sidebar-icon.html',
})
export class SidebarIcon {
  name = input.required<string>();
}
