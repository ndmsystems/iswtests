
import { type Locator, type Page } from '@playwright/test';
import { Pageable } from '../../util/fixtures';

export class ProductImprovement implements Pageable {
  readonly page: Page
  readonly path: string

  readonly refuse: Locator;
  readonly join: Locator

  constructor(page: Page) {
    this.page = page
    this.path = '/product-improvement'

    this.refuse = page.getByRole('button', { name: 'Refuse' })
    this.join = page.getByRole('button', { name: 'Join' })
  }
}