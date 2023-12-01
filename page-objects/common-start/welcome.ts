
import { type Locator, type Page } from '@playwright/test';
import { SelectConfigurationOption } from './select-configuration-option';
import { get } from '../../util/readLocale';
import { Pageable } from '../../util/fixtures';

export class Welcome implements Pageable{
  readonly page: Page
  readonly path: string

  readonly language: Locator;
  readonly runWizard: Locator;
  
  constructor(page: Page) {
    this.page = page
    this.path = '/welcome'

    this.language = page.locator('#mat-select-value-1')
    this.runWizard = page.getByRole('button', { name: get('isw.buttons.run-wizard') })
  }

  async next(selectConfigurationOptionPage : SelectConfigurationOption) {
    await this.runWizard.click()
    await this.page.waitForURL(new RegExp(selectConfigurationOptionPage.path))
  }
}