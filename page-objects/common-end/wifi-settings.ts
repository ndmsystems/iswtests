
import { type Locator, type Page } from '@playwright/test';
import { DigitalCertificates } from './digital-certificates';

export class WiFiNetworkSettings {
  readonly page: Page
  readonly path: string

  readonly ssid: Locator
  readonly password: Locator

  readonly back: Locator;
  readonly nextButton: Locator

  constructor(page: Page) {
    this.page = page
    this.path = '/wifi-settings'

    this.ssid = page.getByLabel('Network name (SSID)')
    this.password = page.getByLabel('Password')

    this.back = page.getByRole('button', { name: 'Back' })
    this.nextButton = page.getByRole('button', { name: 'Next' })
  }

  async next(digitalCertificatesPage: DigitalCertificates) {
    await this.nextButton.click()
    await this.page.waitForURL(new RegExp(digitalCertificatesPage.path))
  }
}