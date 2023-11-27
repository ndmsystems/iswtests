
import { type Locator, type Page } from '@playwright/test';

export class AutoUpdate {
  readonly path: string

  readonly manualUpdating: Locator;
  readonly enableAutomaticUpdates: Locator;
  
  constructor(page: Page) {
    this.path = '/auto-update'

    this.manualUpdating = page.getByRole('button', { name: 'Manual Updating' })
    this.enableAutomaticUpdates = page.getByRole('button', { name: 'Enable Automatic Updates' })
  }
}