
import { type Locator, type Page } from '@playwright/test';
import { Shared } from '../shared';
import { get } from '../../util/readLocale';
import { Pageable } from '../../util/fixtures';

export class TvOption implements Pageable {
  readonly page: Page
  readonly path: string
  
  readonly offTheShelfTv: Locator
  readonly operatorStb: Locator

  readonly back: Locator
  readonly nextButton: Locator

  constructor(page: Page) {
    this.page = page
    this.path = '/tv-option'

    // Off the shelf Smart TV or media player (Recommended)
    this.offTheShelfTv = page.getByText(get('isw.tv-option.links.off-the-shelf-tv.title'))
    //
    this.operatorStb = page.getByText('Operator-branded IPTV STB with custom setup instructions')
  
    this.back = page.getByRole('button', { name: 'Back' })
    this.nextButton = page.getByRole('button', { name: 'Next' })
  }

  async next(page: Pageable) {
    await this.nextButton.click()
    await this.page.waitForURL(new RegExp(page.path))
  }
}