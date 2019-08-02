import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../index';
import { Weather } from '../../../model/weather';

const getWeatherState = createFeatureSelector<AppState>('weather');

const getWeathersState = createSelector(
    getWeatherState, (state: AppState) => {
        return state.citiesList.weathers;
    }
);

const getTimes = (citiesList) => {
    return citiesList.map(list => {
        return {
            time: list.dt_txt
        };
    });
};

const getTemps = (citiesList) => {
    return citiesList.map(list => {
        return {
            temp: list.main.temp,
        };
    });
};

export const getErrorState = createSelector(
    getWeatherState, (state: AppState) => {
        const citiesList = state.citiesList;
        return citiesList.error;
});

export const getWeatherListState = createSelector(
    getWeathersState, (state: Weather[]) => {
        return state.map(weather => {
            const cityName = weather.city.name;
            const times =  getTimes(weather.list);

            const temps =  getTemps(weather.list);
            return {
                cityName,
                times,
                temps
            };
        });
    }
);