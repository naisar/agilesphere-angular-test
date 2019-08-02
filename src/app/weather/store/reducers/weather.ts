import { Weather } from "../../../model/weather";
import * as WeatherActions from '../actions/weather';

export interface WeatherState {
    weathers: Weather[];
    error?: string;
}

export const initialState: WeatherState = {
    weathers: [],
    error: null
};

export function weatherReducer(
    state: WeatherState = initialState,
    action: WeatherActions.WeatherActions
) {
    switch (action.type) {

        case WeatherActions.SEARCH_SUCCESS:
            const cityName = action.payload.city.name;
            const currentWeathers = state.weathers.filter((weather) => weather.city.name !== cityName) || [];
            return {
                ...state,
                weathers: [...currentWeathers].concat(action.payload),
                error: null
            };

        case WeatherActions.SEARCH_ERROR:
            return {
                ...state,
                error: action.payload
            };

        default:
            return state;
    }
}