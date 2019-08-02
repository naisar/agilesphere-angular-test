import { AppPage } from './app.po';
import { browser } from 'protractor';

describe('angular-weather App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it("should search for 1 valid city and show it in results", async () => {
    const VALID_CITY = "Madrid";

    await page.navigateTo();
    await page.searchKey(VALID_CITY);

    const cities = await page.countTableCities();
    expect(cities).toBe(1);

  });

  it("should search for 4 valid cities and show them in results", async () => {
    const VALID_CITIES = ["Madrid", "London", "Rome", "Lisbon"];

    await page.navigateTo();

    for (let i = 0; i < VALID_CITIES.length; i++) {
      await page.searchKey(VALID_CITIES[i]);
    }

    const citiesNumber = await page.countTableCities();
    expect(citiesNumber).toBe(4);

  });

  it("should search for 1 repeated valid city and show 3 cities", async () => {
    const VALID_CITIES = ["Madrid", "Madrid", "Rome", "Lisbon"];

    await page.navigateTo();

    for (let i = 0; i < VALID_CITIES.length; i++) {
      await page.searchKey(VALID_CITIES[i]);
    }

    const citiesNumber = await page.countTableCities();
    expect(citiesNumber).toBe(3);

  });

  it("should search invalid city, show error = 'Error'", async () => {
    const INVALID_CITY = "Amdrid";
    const ERROR_MESSAGE = "Error";

    await page.navigateTo();
    await page.searchKey(INVALID_CITY);


    const errorMessage = await page.getError();
    expect(errorMessage).toEqual(ERROR_MESSAGE);
  });
});
