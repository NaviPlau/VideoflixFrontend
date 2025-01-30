import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  positiveMessage = signal('green');
  negativeMessage = signal('');

  constructor() {}

  setPositiveMessage(message: string) {
    this.positiveMessage.set(message);
    setTimeout(() => {
      this.clearToastMessage();
    }, 2000);
  }

  setNegativeMessage(message: string) {
    this.negativeMessage.set(message);
    setTimeout(() => {
      this.clearToastMessage();
    }, 2000);
  }

  clearToastMessage() {
    this.positiveMessage.set('');
    this.negativeMessage.set('');
  }
}
