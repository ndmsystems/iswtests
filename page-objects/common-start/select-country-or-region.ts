
import { type Locator, type Page } from '@playwright/test';
import { Pageable } from './../../util/fixtures'
import { get } from '../../util/readLocale';

export class SelectCountryOrRegion implements Pageable {
  readonly page: Page
  readonly path: string

  readonly country: Locator
  readonly timeZone: Locator

  readonly nextButton: Locator

  constructor(page: Page) {
    this.page = page
    this.path = '/select-country-or-region'

    this.country = page.getByPlaceholder('Country')
    this.timeZone = page.getByPlaceholder('Time zone:')

    this.nextButton = page.getByRole('button', { name: get('isw.buttons.next') })
  }

  async next(page: Pageable) {
    await this.nextButton.waitFor()
    await this.nextButton.click()
    await this.page.waitForURL(new RegExp(page.path))
  }
}