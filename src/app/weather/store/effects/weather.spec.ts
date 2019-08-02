import { WeatherEffects } from './weather';
import { TestBed } from '@angular/core/testing';
import { SearchStart, SearchSuccess, SearchError } from '../actions/weather';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Actions } from '@ngrx/effects';
import { WeatherService } from '../../weather.service';
import { cold, hot } from 'jasmine-marbles';
import { empty } from 'rxjs/observable/empty';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Weather } from '../../../model/weather';

export class TestActions extends Actions {
    constructor() {
        super(empty());
    }

    set stream(source: Observable<any>) {
        this.source = source;
    }
}

export function getActions() {
    return new TestActions();
}

describe('Weather Effects', () => {
    let actions: TestActions;
    let effects: WeatherEffects;
    let weatherService: WeatherService;

    const MadridWeather: Weather = {
        city: {
            id: 804,
            name: 'Madrid'
        },
        list: [{
            dt: 1564693200,
            main: {
                temp: 27.92,
                temp_min: 27.81,
                temp_max: 27.92,
                pressure: 1013.34,
                sea_level: 1013.34,
                grnd_level: 926.44,
                humidity: 20,
                temp_kf: 0.1
            },
            weather: null,
            clouds: null,
            wind: null,
            sys: null,
            dt_txt: '2019-08-01 21:00:00'
        }]
    };
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
               HttpClientTestingModule,
            ],
            providers: [
                WeatherService,
                WeatherEffects,
                {
                    provide: Actions,
                    useFactory: getActions
                },
                {
                    provide: WeatherService,
                    useValue: {
                        searchWeatherForCity: jasmine.createSpy()
                    }
                }
            ]
        });
        actions = TestBed.get(Actions);
        weatherService = TestBed.get(WeatherService);
        effects = TestBed.get(WeatherEffects);
    });

    it('should return a GetWeather action, with the Weather data, on success', () => {

        const action = new SearchStart('Madrid');
        const outcome = new SearchSuccess(MadridWeather);

        actions.stream = hot('-a', { a: action });
        const response = cold('-a|', { a: MadridWeather });
        const expected = cold('--b', { b: outcome });

        weatherService.searchWeatherForCity = jasmine.createSpy().and.returnValue(response);
        expect(effects.getWeatherRequest).toBeObservable(expected);
    });

    it('should return a GetWeatherFail action, with error message on failure', () => {

        const action = new SearchStart('amdrid');
        const error = new Error('Error') as any;
        const outcome = new SearchError(error.message);

        actions.stream = hot('-a', { a: action });
        const response = cold('-#|', {}, error);
        const expected = cold('--b', { b: outcome });

        weatherService.searchWeatherForCity = jasmine.createSpy().and.returnValue(response);
        expect(effects.getWeatherRequest).toBeObservable(expected);
    });

});