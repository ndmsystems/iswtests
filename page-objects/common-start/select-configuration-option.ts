
import { type Locator, type Page } from '@playwright/test';
import { DevicePrivacyNotice } from './device-privacy-notice';
import { Password } from './password';
import { Pageable } from './../../util/fixtures'
import { get } from '../../util/readLocale';

export class SelectConfigurationOption implements Pageable {
  readonly page: Page
  readonly path: string

  readonly viaDsl: Locator
  readonly viaEthernet: Locator
  readonly viaUsbModem: Locator
  readonly switchToExtender: Locator

  readonly back: Locator
  readonly nextButton: Locator
  readonly exitWizard: Locator

  constructor(page: Page) {
    this.page = page
    this.path = '/select-configuration-option'

    // Only for DSL models ('To set up Internet access via a DSL line/telephone wall outlet; or')
    this.viaDsl = page.getByText(get('isw.select-configuration-option.choices.via-dsl.label'))
    // To set up Internet access via a modem, optical terminal or ethernet wall outlet;
    this.viaEthernet = page.getByText(get('isw.select-configuration-option.choices.via-ethernet.label'))
    // To set up Internet access via mobile broadband USB modem; or
    this.viaUsbModem = page.getByText(get('isw.select-configuration-option.choices.via-usb-modem.label'))
    // To switch to Wi-Fi Extender Mode; or
    this.switchToExtender = page.getByText(get('isw.select-configuration-option.choices.switch-to-extender.label'))
   
    this.back = page.getByRole('button', { name: get('isw.buttons.back') })
    this.nextButton = page.getByRole('button', { name: get('isw.buttons.next') })
    this.exitWizard = page.getByRole('button', { name: get('isw.buttons.exit-wizard') })
    
  }

  async next(page: Pageable) {
    await this.nextButton.click()
    await this.page.waitForURL(new RegExp(page.path))
  }
}