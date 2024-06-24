import { type Locator, type Page } from '@playwright/test';
import { Pageable } from '../../util/fixtures';
import { get } from '../../util/readLocale';
import { Base } from '../base';

export class Password extends Base implements Pageable  {
  readonly page: Page
  readonly path: string

  readonly password: Locator;

  readonly nextButton: Locator

  constructor(page: Page) {
    super(page)

    this.page = page
    this.path = '/password'

    this.password = page.getByLabel(get('password'))

  }
}

