import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import { WeatherState } from '../../store/reducers/weather';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html'
})

export class ResultsComponent implements OnChanges {
  constructor( private store: Store<WeatherState>) {
  }

  @Input() error: string;
  @Input() citiesList = [];

  errorMessage: string;
  tableTh = [];

  ngOnChanges(changes: SimpleChanges) {
    
    if (changes.error) {
      this.errorMessage = changes.error.currentValue;
    } else if (changes.citiesList && changes.citiesList.currentValue.length > 0) {
      this.tableTh = changes.citiesList.currentValue[0].times;
    }        
  }

}