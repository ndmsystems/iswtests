
import { type Locator, type Page } from '@playwright/test';

export class TermsAndPrivacy {
  readonly page: Page
  readonly path: string

  readonly readAndAgreeCheckbox: Locator;
  readonly accept: Locator;
  
  constructor(page: Page) {
    this.page = page
    this.path = '/terms-and-privacy'

    this.readAndAgreeCheckbox = page.locator('.mat-checkbox-inner-container')
    this.accept = page.getByRole('button', { name: 'Accept' })
  }

  async next() {
    await this.accept.click()
  }
}