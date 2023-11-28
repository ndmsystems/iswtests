
import { type Locator, type Page } from '@playwright/test';
import { ShoutIfYouNeedHelp } from './congratulate';

export class YourKeeneticCredentials {
  readonly page: Page
  readonly path: string

  readonly download: Locator;
  readonly copy: Locator
  readonly print: Locator
  readonly nextButton: Locator

  constructor(page: Page) {
    this.page = page
    this.path = '/your-keenetic-credentials'

    this.download = page.getByRole('button', { name: 'Download' })
    this.copy = page.getByRole('button', { name: 'Copy' })
    this.print = page.getByRole('button', { name: 'Print' })
    this.nextButton = page.getByRole('button', { name: 'Next' })
  }

  async next(shoutIfYouNeedHelpPage: ShoutIfYouNeedHelp) {
    await this.nextButton.click()
    await this.page.waitForURL(new RegExp(shoutIfYouNeedHelpPage.path))
  }
}