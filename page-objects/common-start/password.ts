
import { type Locator, type Page } from '@playwright/test';
import { UnplugModem } from '../ethernet-scenario/unplug-modem';
import { Pageable } from '../../util/fixtures';

export class Password implements Pageable {
  readonly page: Page
  readonly path: string

  readonly password: Locator;

  readonly back: Locator;
  readonly nextButton: Locator

  constructor(page: Page) {
    this.page = page
    this.path = '/password'

    this.password = page.getByLabel('Password')
    this.back = page.getByRole('button', { name: 'Back' })
    this.nextButton = page.getByRole('button', { name: 'Next' })
  }

  async next(unplugModemPage: UnplugModem) {
    await this.nextButton.click()
    await this.page.waitForURL(new RegExp(unplugModemPage.path))
  }
}

