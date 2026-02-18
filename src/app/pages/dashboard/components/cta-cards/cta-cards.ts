import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-cta-cards',
  imports: [],
  templateUrl: './cta-cards.html',
})
export class CtaCards {
  clicked = output<void>();

  title = input<string>();
  description = input<string>();
  btnText = input<string>();
  btnBg = input<string>();

  handleClick() {
    this.clicked.emit();
  }
}
