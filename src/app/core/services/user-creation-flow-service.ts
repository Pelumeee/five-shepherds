import { Injectable, signal } from '@angular/core';

type UserFlowStep = 'idle' | 'create' | 'done';

@Injectable({
  providedIn: 'root',
})
export class UserCreationFlowService {
  step = signal<UserFlowStep>('idle');

  startCreate() {
    this.step.set('create');
  }

  userCreated() {
    this.step.set('done');
  }

  reset() {
    this.step.set('idle');
  }
}
