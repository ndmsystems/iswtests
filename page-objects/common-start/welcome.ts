
import { type Locator, type Page } from '@playwright/test';
import { get } from '../../util/readLocale';
import { Pageable } from '../../util/fixtures';

export class Welcome implements Pageable {
  readonly page: Page
  readonly path: string

  readonly language: Locator;
  readonly runWizardButton: Locator;
  
  constructor(page: Page) {
    this.page = page
    this.path = '/welcome'

    this.language = page.locator('#mat-select-value-1')
    this.runWizardButton = page.getByRole('button', { name: get('isw.buttons.run-wizard') })
  }

  async runWizard(page: Pageable) {
    await this.runWizardButton.waitFor()
    await this.runWizardButton.click()
    await this.page.waitForURL(new RegExp(page.path))
  }
}