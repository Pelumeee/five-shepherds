import { Component, input } from '@angular/core';

@Component({
  selector: 'app-cta-cards',
  imports: [],
  templateUrl: './cta-cards.html',
})
export class CtaCards {
  title = input<string>();
  description = input<string>();
  btnText = input<string>();
  btnBg = input<string>();
}
