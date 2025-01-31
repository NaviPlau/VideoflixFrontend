import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  positiveMessage = signal('');
  negativeMessage = signal('');

  constructor() {}

  setPositiveMessage(message: string) {
    this.positiveMessage.set(message);
    setTimeout(() => {
      this.clearToastMessage();
    }, 3000);
  }

  setNegativeMessage(message: string) {
    this.negativeMessage.set(message);
    setTimeout(() => {
      this.clearToastMessage();
    }, 3000);
  }

  clearToastMessage() {
    this.positiveMessage.set('');
    this.negativeMessage.set('');
  }
}
