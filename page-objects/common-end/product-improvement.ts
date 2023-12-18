
import { type Locator, type Page } from '@playwright/test';
import { Pageable } from '../../util/fixtures';
import { get } from '../../util/readLocale';

export class ProductImprovement implements Pageable {
  readonly page: Page
  readonly path: string

  readonly refuse: Locator;
  readonly join: Locator

  constructor(page: Page) {
    this.page = page
    this.path = '/product-improvement'

    this.refuse = page.getByRole('button', { name: get('isw.buttons.do-not-share') })
    this.join = page.getByRole('button', { name: get('isw.buttons.share') })
  }
}