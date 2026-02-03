import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-toggle-input',
  imports: [],
  templateUrl: './toggle-input.html',
})
export class ToggleInput {
  enabled = input<boolean>(false);
  enabledChange = output<boolean>();

  toggle() {
    this.enabledChange.emit(!this.enabled());
  }
}
