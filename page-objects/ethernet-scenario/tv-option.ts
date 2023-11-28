
import { type Locator, type Page } from '@playwright/test';
import { Shared } from '../shared';

export enum TvOptionType {
  OFF_THE_SHELF_TV,
  OPERATOR_STB
}

export class TvOption {
  readonly page: Page
  readonly path: string
  
  readonly offTheShelfTv: Locator
  readonly operatorStb: Locator

  readonly back: Locator
  readonly nextButton: Locator

  constructor(page: Page) {
    this.page = page
    this.path = '/tv-option'

    this.offTheShelfTv = page.getByText('Off the shelf Smart TV or media player (Recommended)')
    this.operatorStb = page.getByText('Operator-branded IPTV STB with custom setup instructions')
  
    this.back = page.getByRole('button', { name: 'Back' })
    this.nextButton = page.getByRole('button', { name: 'Next' })
  }

  async next() {
    await this.nextButton.click()
  }
}