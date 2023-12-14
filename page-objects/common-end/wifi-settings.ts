
import { type Locator, type Page } from '@playwright/test';
import { Pageable } from '../../util/fixtures';
import { Base } from '../base';

export class WiFiNetworkSettings extends Base implements Pageable {
  readonly page: Page
  readonly path: string

  readonly ssid: Locator
  readonly password: Locator

  constructor(page: Page) {
    super(page)

    this.page = page
    this.path = '/wifi-settings'

    this.ssid = page.getByLabel('Network name (SSID)')
    this.password = page.getByLabel('Password')
  }
}