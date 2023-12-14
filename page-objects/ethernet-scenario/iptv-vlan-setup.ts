
import { type Locator, type Page } from '@playwright/test';
import { Pageable } from './../../util/fixtures'
import { get } from '../../util/readLocale';
import { Base } from '../base';

export class iptvVlanSetup extends Base implements Pageable {
  readonly page: Page
  readonly path: string

  readonly vlan: Locator

  readonly back: Locator
  readonly withoutVlan: Locator

  constructor(page: Page) {
    super()

    this.page = page
    this.path = '/vlan-information'

    this.vlan = page.getByLabel(get('isw.vlan-setup.form.inet-vlan'))

    this.back = page.getByRole('button', { name: get('isw.buttons.back') })
    this.withoutVlan = page.getByRole('button', { name: get('isw.vlan-setup.without-vlan') })
  }
}