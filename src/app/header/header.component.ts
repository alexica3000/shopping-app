import {AfterViewInit, Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isOpenDropdown = false;
  @Output() featureSelected = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  toogleDropDown(): void {
    this.isOpenDropdown = !this.isOpenDropdown;
  }

  onSelect(feature: string): void {
    this.featureSelected.emit(feature);
  }

}
