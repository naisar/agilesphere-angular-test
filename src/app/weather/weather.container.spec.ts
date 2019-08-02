import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { WeatherContainer } from './weather.container';
import { StoreModule, Store } from '@ngrx/store';
import { reducers } from './store';
import { WeatherState } from './store/reducers/weather';
import { SearchStart } from './store/actions/weather';

describe('WeatherContainer', () => {
  let component: WeatherContainer;
  let fixture: ComponentFixture<WeatherContainer>;

  let store: Store<WeatherState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherContainer ],
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('weather', reducers),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherContainer);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    spyOn(store, 'dispatch');
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch an event when a city is searched', () => {
    const city = 'Madrid';
    const searchCityAction = new SearchStart(city);
    component.citySearch(city);
    expect(store.dispatch).toHaveBeenCalledWith(searchCityAction);
  });

});
