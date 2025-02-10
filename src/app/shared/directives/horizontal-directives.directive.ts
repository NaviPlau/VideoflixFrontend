import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHorizontalDirectives]'
})
export class HorizontalDirectivesDirective {

  private isHovering = false;  // Check if mouse is inside the element
  private hasOverflow = false; // Check if overflow exists

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter')
  onMouseEnter() {
    this.checkOverflow();  // Check for overflow when mouse enters
    this.isHovering = true;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.isHovering = false;
  }

  @HostListener('window:resize')
  onResize() {
    this.checkOverflow();  // Recheck overflow on window resize
  }

  @HostListener('wheel', ['$event'])
  onScroll(event: WheelEvent) {
    if (this.isHovering && this.hasOverflow) {
      this.el.nativeElement.scrollLeft += event.deltaY;  // Horizontal scroll
      event.preventDefault();  // Prevent vertical scrolling
    }
  }

  private checkOverflow(): void {
    const element = this.el.nativeElement;
    this.hasOverflow = element.scrollWidth > element.clientWidth;

    // Optionally add or remove a class to indicate overflow state
    if (this.hasOverflow) {
      this.renderer.addClass(element, 'has-overflow');
    } else {
      this.renderer.removeClass(element, 'has-overflow');
    }
  }

}
