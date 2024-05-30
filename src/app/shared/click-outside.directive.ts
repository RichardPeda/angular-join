import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appClickOutside]',
  standalone: true,
})
export class ClickOutsideDirective {
  @Output() clickOutside = new EventEmitter<void>();

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event.target'])
  public onClick(target: any) {
    const clickedInside =
      this.elementRef.nativeElement.contains(target) ||
      target.tagName === 'svg' ||
      target.tagName === 'path' ||
      target.tagName === 'rect';

    if (!clickedInside) {
      this.clickOutside.emit();
    }
  }
}
