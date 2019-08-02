import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { switchMap, catchError, map } from 'rxjs/operators';
import * as WeatherActions from '../../store/actions/weather';
import {WeatherService} from '../../weather.service';
import 'rxjs/add/observable/of';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class WeatherEffects {

    @Effect()
    getWeatherRequest = this.actions$.pipe(
        ofType(WeatherActions.SEARCH_START),
        switchMap((WeatherData: WeatherActions.SearchStart) => {
            return this.weatherService.searchWeatherForCity(WeatherData.payload)
                .pipe(
                    map(weatherData => {
                        return new WeatherActions.SearchSuccess(weatherData);
                    }),
                    catchError(errorRes => {
                        return Observable.of(new WeatherActions.SearchError('Error'));
                    })
                );
        }));

    
    constructor(
        private actions$: Actions,
        private weatherService: WeatherService
    ) {}
}