
import { type Locator, type Page } from '@playwright/test';
import { Pageable } from '../../util/fixtures';
import { Base } from '../base';

export class YourKeeneticCredentials extends Base implements Pageable {
  readonly page: Page
  readonly path: string

  readonly download: Locator;
  readonly copy: Locator
  readonly print: Locator

  constructor(page: Page) {
    super()

    this.page = page
    this.path = '/your-keenetic-credentials'

    this.download = page.getByRole('button', { name: 'Download' })
    this.copy = page.getByRole('button', { name: 'Copy' })
    this.print = page.getByRole('button', { name: 'Print' })
  }
}