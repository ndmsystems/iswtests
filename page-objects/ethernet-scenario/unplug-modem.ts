
import { type Locator, type Page } from '@playwright/test';
import { Pageable } from '../../util/fixtures';
import { get } from '../../util/readLocale';
import { Base } from '../base';

export class UnplugModem extends Base implements Pageable {
  readonly page: Page
  readonly path: string

  readonly iHaveNoModem: Locator

  constructor(page: Page) {
    super(page)

    this.page = page
    this.path = '/unplug-modem'

    this.iHaveNoModem = page.getByRole('button', { name: get('isw.buttons.no-modem') })
  }
}

