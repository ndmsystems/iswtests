import { Locator } from '@playwright/test'
import { Page } from 'playwright'
import { Pageable } from '../util/fixtures'
import { get } from '../util/readLocale'

export class Base {
  readonly nextButton: Locator

  constructor(protected page: Page) {
    this.nextButton = page.getByRole('button', { name: get('isw.buttons.next') })
  }
  
  async next(page: Pageable) {
    await this.nextButton.click()
    await page.page.waitForURL(new RegExp(page.path))
  }
}