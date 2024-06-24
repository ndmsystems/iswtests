import { Locator, Page } from '@playwright/test'
import { Pageable } from '../util/fixtures'
import { get } from '../util/readLocale'

export class Base {
  readonly nextButton: Locator
  readonly backButton: Locator

  constructor(public readonly page: Page) {
    this.nextButton = this.page.getByRole('button', { name: get('isw.buttons.next') })
    this.backButton = this.page.getByRole('button', { name: get('isw.buttons.back') })
  }
    
  async next(page: Pageable) {
    await this.nextButton.waitFor()
    await page.page.waitForTimeout(2000)
    await this.nextButton.click()
    console.log('Clicked "NEXT", expected to go to', page.path)

    await page.page.waitForURL(new RegExp(page.path))
    console.log('Arrived at', page.page.url())
  }

  async back(page: Pageable) {
    await this.backButton.waitFor()
    await this.backButton.click()
    console.log('Clicked "BACK", expected to go to', page.path)

    await page.page.waitForURL(new RegExp(page.path))
  }
}