import {AfterViewInit, Component, OnInit} from '@angular/core';
import {DataStorageService} from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isOpenDropdown = false;

  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
  }

  toogleDropDown(): void {
    this.isOpenDropdown = !this.isOpenDropdown;
  }

  onSaveData(): void {
    this.dataStorageService.storeRecipes();
  }

  onFetchData(): void {
    this.dataStorageService.fetchRecipes();
  }
}
