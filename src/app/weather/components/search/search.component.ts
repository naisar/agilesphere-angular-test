import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent {
  cityControl: FormControl = new FormControl();
  constructor() { }

  @Output() onSearch = new EventEmitter<string>();

  search() {
    if (this.cityControl.valid) {
      this.onSearch.emit(this.cityControl.value);
    }
  }
}
