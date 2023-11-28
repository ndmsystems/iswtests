
import { type Locator, type Page } from '@playwright/test';

export class UnplugModem {
  readonly page: Page
  readonly path: string

  readonly password: Locator;

  readonly back: Locator;
  readonly iHaveNoModem: Locator
  readonly nextButton: Locator

  constructor(page: Page) {
    this.page = page
    this.path = '/unplug-modem'

    this.back = page.getByRole('button', { name: 'Back' })
    this.iHaveNoModem = page.getByRole('button', { name: 'I have no modem' })
    this.nextButton = page.getByRole('button', { name: 'Next' })
  }

  async next() {
    await this.nextButton.click()
  }
}

