
import { type Locator, type Page } from '@playwright/test';
import { Pageable } from './../../util/fixtures'
import { get } from '../../util/readLocale';

export class SelectWanPort implements Pageable {
  readonly page: Page
  readonly path: string

  readonly port: Locator

  readonly back: Locator
  readonly nextButton: Locator

  constructor(page: Page) {
    this.page = page
    this.path = '/select-2_5G-wan-port'

    this.port = page.locator('#mat-select-value-1')

    this.back =  page.getByRole('button', { name: get('isw.buttons.back') })
    this.nextButton = page.getByRole('button', { name: get('isw.buttons.next') })
  }

  async next(page: Pageable) {
    await this.nextButton.click()
    await this.page.waitForURL(new RegExp(page.path))
  }
}