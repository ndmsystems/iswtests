
import { type Locator, type Page } from '@playwright/test';
import { Pageable } from './../../util/fixtures'
import { get } from '../../util/readLocale';

export class iptvVlanSetup implements Pageable {
  readonly page: Page
  readonly path: string

  readonly vlan: Locator

  readonly back: Locator
  readonly withoutVlan: Locator
  readonly nextButton: Locator

  constructor(page: Page) {
    this.page = page
    this.path = '/vlan-information'

    this.vlan = page.getByLabel(get('isw.vlan-setup.form.inet-vlan'))

    this.back = page.getByRole('button', { name: get('isw.buttons.back') })
    this.withoutVlan = page.getByRole('button', { name: get('isw.vlan-setup.without-vlan') })
    this.nextButton = page.getByRole('button', { name: get('isw.buttons.next') })
  }

  async next(page: Pageable) {
    await this.nextButton.click()
    await this.page.waitForURL(new RegExp(page.path))
  }
}