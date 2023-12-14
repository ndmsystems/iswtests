import { type Locator, type Page } from '@playwright/test';
import { UnplugModem } from '../ethernet-scenario/unplug-modem';
import { Pageable } from '../../util/fixtures';
import { get } from '../../util/readLocale';
import { Base } from '../base';

export class Password extends Base implements Pageable  {
  readonly page: Page
  readonly path: string

  readonly password: Locator;

  readonly back: Locator;
  readonly nextButton: Locator

  constructor(page: Page) {
    super()

    this.page = page
    this.path = '/password'

    this.password = page.getByLabel(get('password'))

    this.back = page.getByRole('button', { name: get('isw.buttons.back') })
    this.nextButton = page.getByRole('button', { name: get('isw.buttons.next') })
  }
}

