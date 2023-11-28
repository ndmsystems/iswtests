
import { type Locator, type Page } from '@playwright/test';
import { ProductImprovement } from './product-improvement';

export class DigitalCertificates {
  readonly page: Page
  readonly path: string

  readonly back: Locator;
  readonly nextButton: Locator

  constructor(page: Page) {
    this.page = page
    this.path = '/digital-certificates'

    this.back = page.getByRole('button', { name: 'Back' })
    this.nextButton = page.getByRole('button', { name: 'Next' })
  }

  async next(productImprovementPage: ProductImprovement) {
    await this.nextButton.click()
    await this.page.waitForURL(new RegExp(productImprovementPage.path))
  }
}