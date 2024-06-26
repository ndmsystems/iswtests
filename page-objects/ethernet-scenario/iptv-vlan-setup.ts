
import { type Locator, type Page } from '@playwright/test';
import { get } from '../../util/readLocale';
import { Base } from '../base';
import { Pageable } from './../../util/fixtures';

export class iptvVlanSetup extends Base implements Pageable {
  readonly page: Page
  readonly path: string

  readonly vlan: Locator

  readonly withoutVlan: Locator

  constructor(page: Page) {
    super(page)

    this.page = page
    this.path = '/vlan-information'

    this.vlan = page.getByLabel(get('isw.vlan-setup.form.inet-vlan'))
    this.withoutVlan = page.getByRole('button', { name: get('isw.vlan-setup.without-vlan') })
  }
}