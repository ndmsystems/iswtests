
import { type Locator, type Page } from '@playwright/test';
import { Pageable } from '../../util/fixtures';
import { Base } from '../base';
import { get } from '../../util/readLocale';

export class WiFiNetworkSettings extends Base implements Pageable {
  readonly page: Page
  readonly path: string

  readonly ssid: Locator
  readonly password: Locator

  constructor(page: Page) {
    super()

    this.page = page
    this.path = '/wifi-settings'

    this.ssid = page.getByLabel(get('isw.wifi-settings.ssid'))
    this.password = page.getByLabel(get('isw.wifi-settings.psk'))
  }
}