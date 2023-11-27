
import { type Locator, type Page } from '@playwright/test';
import { Shared } from '../shared';

export enum TvOptionType {
  OFF_THE_SHELF_TV,
  OPERATOR_STB
}

export class SelectConfigurationOption {
  readonly path: string
  
  readonly back: Locator
  readonly nextButton: Locator

  readonly 
  constructor(page: Page) {
    this.path = '/tv-option'

    this.back = page.getByRole('button', { name: 'Back' })
    this.nextButton = page.getByRole('button', { name: 'Next' })
  }

  async next() {
    await this.nextButton.click()
  }
}