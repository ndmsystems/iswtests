import { type Locator, type Page } from '@playwright/test';
import { Pageable } from './../../util/fixtures'
import { get } from '../../util/readLocale';
import { Base } from '../base';

export class connectionTypeSetup extends Base implements Pageable {
  readonly page: Page
  readonly path: string

  readonly connectionTypeCheckbox: Locator

  constructor(page: Page) {
    super()

    this.page = page
    this.path = '/connection-type'

    this.connectionTypeCheckbox =  page.getByText('Username/Password Connection (PPPoE)')
    
  }
}