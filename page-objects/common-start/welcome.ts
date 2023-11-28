
import { type Locator, type Page } from '@playwright/test';
import { SelectConfigurationOption } from './select-configuration-option';

export class Welcome {
  readonly page: Page
  readonly path: string

  readonly language: Locator;
  readonly runWizard: Locator;
  
  constructor(page: Page) {
    this.page = page
    this.path = '/welcome'

    this.language = page.locator('#mat-select-value-1')
    this.runWizard = page.getByRole('button', { name: 'Run wizard' })
  }

  async next(selectConfigurationOptionPage : SelectConfigurationOption) {
    await this.runWizard.click()
    await this.page.waitForURL(new RegExp(selectConfigurationOptionPage.path))
  }
}