
import { type Locator, type Page } from '@playwright/test';

export class Shared {
  readonly back: Locator;
  readonly next: Locator;
  readonly exitWizard: Locator;
  
  constructor(page: Page) {
    this.back = page.getByRole('button', { name: 'Back' })
    this.next = page.getByRole('button', { name: 'Next' })
    this.exitWizard = page.getByRole('button', { name: 'Exit Wizard' })
  }
}