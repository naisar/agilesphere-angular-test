import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SearchComponent } from './search.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a valid city value', () => {
    component.cityControl.setValue('London');
    expect(component.cityControl.value).toBeTruthy();
  });

  it('should require a valid city value', () => {
    component.cityControl.setValue('');
    expect(component.cityControl.value).toBeFalsy();
  });

  it('should emit an event when searched', () => {
    component.cityControl.setValue('London');
    spyOn(component.onSearch, 'emit');
    component.search();
    expect(component.onSearch.emit).toHaveBeenCalledWith('London');
  });

  it('should not emit an event if blank input', () => {
    component.cityControl.setValue('');
    spyOn(component.onSearch, 'emit');
    component.search();
    expect(component.onSearch.emit).not.toHaveBeenCalled();
  })

});
