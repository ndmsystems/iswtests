
import { type Locator, type Page } from '@playwright/test';
import { get } from '../../util/readLocale';

export class AutoUpdate {
  readonly page: Page
  readonly path: string

  readonly manualUpdating: Locator;
  readonly enableAutomaticUpdates: Locator;
  
  constructor(page: Page) {
    this.page = page
    this.path = '/auto-update'

    this.manualUpdating = page.getByRole('button', { name: get('isw.auto-update.manual-update-btn-no-updates') })
    this.enableAutomaticUpdates = page.getByRole('button', { name: get('isw.auto-update.auto-update-btn') })
  }
}