
import { type Locator, type Page } from '@playwright/test';
import { Base } from '../base';
import { Pageable } from './../../util/fixtures';

export class SelectWanPort extends Base implements Pageable {
  readonly page: Page
  readonly path: string

  readonly port: Locator

  constructor(page: Page) {
    super(page)

    this.page = page
    this.path = '/select-2_5G-wan-port'

    this.port = page.locator('#mat-select-value-1')
  }
}