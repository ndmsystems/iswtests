
import { type Locator, type Page } from '@playwright/test';
import { Shared } from '../shared';
import { DevicePrivacyNotice } from './device-privacy-notice';

export enum ConnectionType {
  VIA_ETHERNET,
  VIA_USB_MODEM,
  SWITCH_TO_EXTENDER,
  RESTORE_CONFIGURATION,
}

export class SelectConfigurationOption {
  readonly page: Page
  readonly path: string
  readonly shared: Shared

  readonly via_ethernet: Locator

  readonly back: Locator
  readonly nextButton: Locator
  readonly exitWizard: Locator

  constructor(page: Page) {
    this.page = page
    this.path = '/select-configuration-option'

    this.via_ethernet = page.getByText('To set up Internet access via a modem, optical terminal or ethernet wall outlet;')
    this.back = page.getByRole('button', { name: 'Back' })
    this.nextButton = page.getByRole('button', { name: 'Next' })
    this.exitWizard = page.getByRole('button', { name: 'Exit Wizard' })
    
  }

  async next(devicePrivacyNotice: DevicePrivacyNotice) {
    await this.nextButton.click()
    await this.page.waitForURL(new RegExp(devicePrivacyNotice.path))
  }
}