import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackgroundImageService {
  images = signal<string[]>(this.generateImagePaths(10, 'shared/images/background', '.png'));
  currentBackground = signal<string>(this.images()[0]);
  animationClass = signal<string>('fade-in'); 
  lastIndex = 0;

  constructor() {
    this.updateBackgroundRandomly();
  }

  generateImagePaths(count: number, basePath: string, extension: string): string[] {
    return Array.from({ length: count }, (_, i) => `${basePath}${i}${extension}`);
  }

  updateBackgroundRandomly(): void {
    setInterval(() => {
      const availableIndexes = this.images()
        .map((_, index) => index)
        .filter((index) => index !== this.lastIndex);
      const randomIndex = availableIndexes[Math.floor(Math.random() * availableIndexes.length)];
      this.lastIndex = randomIndex;
      this.currentBackground.set(this.images()[randomIndex]);
      this.resetAnimation(); 
    }, 10000);
  }

  resetAnimation(): void {
    this.animationClass.set(''); 
    setTimeout(() => {
      this.animationClass.set('fade-in'); 
    }, 5); 
  }
}

