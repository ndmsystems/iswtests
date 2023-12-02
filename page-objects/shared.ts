
import { type Locator, type Page } from '@playwright/test';
import { Pageable } from '../util/fixtures';

export class Shared {
  readonly page: Page
  readonly back: Locator;
  readonly nextButton: Locator;
  readonly exitWizard: Locator;
  
  constructor(page: Page) {
    this.page = page
    this.back = page.getByRole('button', { name: 'Back' })
    this.nextButton = page.getByRole('button', { name: 'Next' })
    this.exitWizard = page.getByRole('button', { name: 'Exit Wizard' })
  }

  async next(page: Pageable) {
    await this.nextButton.click()
    await this.page.waitForURL(page.path)
  }
}