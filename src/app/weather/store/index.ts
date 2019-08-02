import { ActionReducerMap } from '@ngrx/store';
import { WeatherState, weatherReducer } from './reducers/weather';


export interface AppState {
    citiesList: WeatherState;
}

export const reducers: ActionReducerMap<AppState> = {
    citiesList: weatherReducer
};

export * from './effects/weather';