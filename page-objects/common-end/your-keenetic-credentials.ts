
import { type Locator, type Page } from '@playwright/test';

export class YourKeeneticCredentials {
  readonly path: string

  readonly download: Locator;
  readonly copy: Locator
  readonly print: Locator
  readonly next: Locator

  constructor(page: Page) {
    this.path = '/your-keenetic-credentials'

    this.download = page.getByRole('button', { name: 'Download' })
    this.copy = page.getByRole('button', { name: 'Copy' })
    this.print = page.getByRole('button', { name: 'Print' })
    this.next = page.getByRole('button', { name: 'Next' })
  }
}