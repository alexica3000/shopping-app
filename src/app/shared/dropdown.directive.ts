import {Directive, ElementRef, HostBinding, HostListener, ViewChild} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.show') isOpen = false;
  @ViewChild('appClickDropdown', {static: false}) clickInput: ElementRef;

  @HostListener('click') toggleOpen(): void {
    // console.log(this.clickInput);
    this.isOpen = !this.isOpen;
  }

  constructor() { }

}
