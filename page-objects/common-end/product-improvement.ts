
import { type Locator, type Page } from '@playwright/test';

export class ProductImprovement {
  readonly path: string

  readonly refuse: Locator;
  readonly join: Locator

  constructor(page: Page) {
    this.path = '/product-improvement'

    this.refuse = page.getByRole('button', { name: 'Refuse' })
    this.join = page.getByRole('button', { name: 'Join' })
  }
}