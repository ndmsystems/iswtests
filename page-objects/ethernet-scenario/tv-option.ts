
import { type Locator, type Page } from '@playwright/test';
import { Pageable } from '../../util/fixtures';
import { get } from '../../util/readLocale';
import { Base } from '../base';

export class TvOption extends Base implements Pageable {
  readonly page: Page
  readonly path: string
  
  readonly offTheShelfTv: Locator
  readonly operatorStb: Locator

  constructor(page: Page) {
    super(page)

    this.page = page
    this.path = '/tv-option'

    this.offTheShelfTv = page.getByText(get('isw.tv-option.links.off-the-shelf-tv.title'))
    this.operatorStb = page.getByText(get('isw.tv-option.links.operator-stb.title'))
  }
}