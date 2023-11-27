
import { type Locator, type Page } from '@playwright/test';

export class DigitalCertificates {
  readonly path: string

  readonly back: Locator;
  readonly nextButton: Locator

  constructor(page: Page) {
    this.path = '/digital-certificates'

    this.back = page.getByRole('button', { name: 'Back' })
    this.nextButton = page.getByRole('button', { name: 'Next' })
  }
}