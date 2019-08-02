import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SearchStart } from './store/actions/weather';
import {getErrorState, getWeatherListState} from './store/selectors/weather';
import { WeatherState } from './store/reducers/weather';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-weather',
  template: `
  <app-search (onSearch)="citySearch($event)"></app-search>
  <app-results [citiesList]="citiesList$ | async" [error]="error$ | async"></app-results>  `
})
export class WeatherContainer implements OnInit{

  citiesList$: Observable<any>;
  error$: Observable<any>;

  constructor(private store: Store<WeatherState>) {}

  ngOnInit(): void {
    this.citiesList$ = this.store.select(getWeatherListState);
    this.error$ = this.store.select(getErrorState);
  }

  citySearch(city) {
    this.store.dispatch(
      new SearchStart(city)
   );
  }
}
