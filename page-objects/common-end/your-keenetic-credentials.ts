
import { type Locator, type Page } from '@playwright/test';
import { Pageable } from '../../util/fixtures';
import { Base } from '../base';
import { get } from '../../util/readLocale';

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

    this.download = page.getByRole('button', { name: get('isw.buttons.download') })
    this.copy = page.getByRole('button', { name: get('isw.buttons.copy') })
    this.print = page.getByRole('button', { name: get('isw.buttons.print') })
  }
}