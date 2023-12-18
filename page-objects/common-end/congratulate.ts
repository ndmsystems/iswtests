
import { type Locator, type Page } from '@playwright/test';
import { Pageable } from '../../util/fixtures';
import { get } from '../../util/readLocale';

export class Congratulate implements Pageable {
  readonly page: Page
  readonly path: string

  readonly finishButton: Locator

  constructor(page: Page) {
    this.page = page
    this.path = '/congratulate'

    this.finishButton = page.getByRole('button', { name: get('isw.buttons.finish') })
  }

  async finish() {
    await this.finishButton.click()
    await this.page.waitForURL(/dashboard/)
  }
}