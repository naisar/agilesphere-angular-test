import { browser, by, element, $$ } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  async searchKey(city: string) {
    await $$('input').get(0).clear();
    await $$('input').get(0).sendKeys(city);
    await $$('button').get(0).click();
  }

  async countTableCities() {
    return $$('.city-name').count();
  }

  getError() {
    return element(by.css('.error')).getText();
  }
}

