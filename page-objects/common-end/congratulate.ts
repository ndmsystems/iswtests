
import { type Locator, type Page } from '@playwright/test';

export class ShoutIfYouNeedHelp {
  readonly page: Page
  readonly path: string

  readonly finishButton: Locator;

  constructor(page: Page) {
    this.page = page
    this.path = '/congratulate'

    this.finishButton = page.getByRole('button', { name: 'Finish' })
  }

  async finish() {
    await this.finishButton.click()
    await this.page.waitForURL(/dashboard/)
  }
}