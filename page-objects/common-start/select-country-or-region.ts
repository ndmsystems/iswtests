
import { type Locator, type Page } from '@playwright/test';
import { Pageable } from './../../util/fixtures'
import { get } from '../../util/readLocale';
import { Base } from '../base';

export class SelectCountryOrRegion extends Base implements Pageable {
  readonly page: Page
  readonly path: string

  readonly country: Locator
  readonly timeZone: Locator

  constructor(page: Page) {
    super()

    this.page = page
    this.path = '/select-country-or-region'

    this.country = page.getByPlaceholder(get('isw.select-country-or-region.country'))
    this.timeZone = page.getByPlaceholder(get('isw.select-country-or-region.timezone'))
  }
}