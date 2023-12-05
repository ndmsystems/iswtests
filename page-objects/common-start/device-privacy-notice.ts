import { expect, type Locator, type Page } from '@playwright/test';
import { Password } from './password';
import { get } from '../../util/readLocale';
import { Pageable } from '../../util/fixtures';

export class DevicePrivacyNotice implements Pageable {
  readonly page: Page
  readonly path: string

  readonly agreeCheckbox: Locator
  readonly acceptButton: Locator
  readonly baseUrl: string

  constructor(page: Page) {
    this.page = page
    this.path = '/accept-device-privacy-notice'

    // 'By checking this box, I confirm that I have read and agree to the terms of the E'
    this.agreeCheckbox = page.getByText(get('dpn.not-accepted.acceptance'))
    
    // Footer
    this.acceptButton = page.getByRole('button', { name: get('dpn.agree') })
  }

  async next(page: Pageable) {
    await this.acceptButton.click()
    expect (await this.page.waitForURL(new RegExp(page.path)))
  }
}