import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHorizontalDirectives]'
})
export class HorizontalDirectivesDirective {

  private isHovering = false; 
  private hasOverflow = false; 

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter')
  onMouseEnter() {
    this.checkOverflow();  
    this.isHovering = true;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.isHovering = false;
  }

  @HostListener('window:resize')
  onResize() {
    this.checkOverflow();  
  }

  @HostListener('wheel', ['$event'])
  onScroll(event: WheelEvent) {
    if (this.isHovering && this.hasOverflow) {
      this.el.nativeElement.scrollLeft += event.deltaY;  
      event.preventDefault();  
    }
  }

  private checkOverflow(): void {
    const element = this.el.nativeElement;
    this.hasOverflow = element.scrollWidth > element.clientWidth;

    
    if (this.hasOverflow) {
      this.renderer.addClass(element, 'has-overflow');
    } else {
      this.renderer.removeClass(element, 'has-overflow');
    }
  }

}
