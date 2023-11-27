
import { type Locator, type Page } from '@playwright/test';

export class ShoutIfYouNeedHelp {
  readonly path: string

  readonly finish: Locator;

  constructor(page: Page) {
    this.path = '/congratulate'

    this.finish = page.getByRole('button', { name: 'Finish' })
  }
}