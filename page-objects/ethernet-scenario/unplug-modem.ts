
import { type Locator, type Page } from '@playwright/test';
import { Pageable } from '../../util/fixtures';

export class UnplugModem implements Pageable {
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

  async next(page: Pageable) {
    await this.nextButton.click()
    await this.page.waitForURL(new RegExp(page.path))
  }
}

