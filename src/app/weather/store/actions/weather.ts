import { Action } from '@ngrx/store';
import { Weather } from '../../../model/weather';

export const SEARCH_START = '[Weather] Search Start';
export const SEARCH_SUCCESS = '[Weather] Search Success';
export const SEARCH_ERROR = '[Weather] Search error';

export class SearchStart implements Action {
    public readonly type = SEARCH_START;
    constructor(public payload: string ) {}
}

export class SearchSuccess implements Action {
    public readonly type = SEARCH_SUCCESS;
    constructor(public payload: Weather) {}
}

export class SearchError implements Action {
    readonly type = SEARCH_ERROR;
    public constructor(public payload: string) {}
}

export type WeatherActions = SearchStart | SearchSuccess | SearchError;
