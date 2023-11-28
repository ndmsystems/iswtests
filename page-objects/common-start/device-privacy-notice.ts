import { expect, type Locator, type Page } from '@playwright/test';
import { Password } from './password';

export class DevicePrivacyNotice {
  readonly page: Page
  readonly path: string

  readonly agreeCheckbox: Locator
  readonly accept: Locator
  readonly baseUrl: string

  constructor(page: Page) {
    this.page = page
    this.path = '/terms-and-privacy'

    this.agreeCheckbox = page.getByText('By checking this box, I confirm that I have read and agree to the terms of the E')
    this.accept = page.getByRole('button', { name: 'Accept' })
  }

  async next(password: Password) {
    await this.accept.click()
    expect (await this.page.waitForURL(new RegExp(password.path)))
  }
}