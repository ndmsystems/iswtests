
import { type Locator, type Page } from '@playwright/test';

export class WiFiNetworkSettings {
  readonly path: string

  readonly ssid: Locator
  readonly password: Locator

  readonly back: Locator;
  readonly nextButton: Locator

  constructor(page: Page) {
    this.path = '/wifi-settings'

    this.ssid = page.getByLabel('Network name (SSID)')
    this.password = page.getByLabel('Password')

    this.back = page.getByRole('button', { name: 'Back' })
    this.nextButton = page.getByRole('button', { name: 'Next' })
  }
}