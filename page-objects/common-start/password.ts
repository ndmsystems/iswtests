
import { type Locator, type Page } from '@playwright/test';

export class Password {
  readonly path: string

  readonly password: Locator;

  readonly back: Locator;
  readonly nextButton: Locator

  constructor(page: Page) {
    this.path = '/password'

    this.password = page.getByLabel('Password')
    this.back = page.getByRole('button', { name: 'Back' })
    this.nextButton = page.getByRole('button', { name: 'Next' })
  }

  async next() {
    await this.nextButton.click()
  }
}

