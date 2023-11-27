
import { type Locator, type Page } from '@playwright/test';
import { Shared } from '../shared';


export class SelectConfigurationOption {
  readonly path: string
  readonly shared: Shared

  readonly language: Locator;
  readonly runWizard: Locator;
  
  readonly back: Locator
  readonly nextButton: Locator
  readonly exitWizard: Locator

  readonly 
  constructor(page: Page) {
    this.path = '/select-configuration-option'

    this.language = page.locator('#mat-select-value-1')
    this.runWizard = page.getByRole('button', { name: 'Run wizard' })

    this.back = page.getByRole('button', { name: 'Back' })
    this.nextButton = page.getByRole('button', { name: 'Next' })
    this.exitWizard = page.getByRole('button', { name: 'Exit Wizard' })
    
  }

  async next() {
    await this.nextButton.click()
  }
}