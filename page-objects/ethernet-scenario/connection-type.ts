import { type Locator, type Page } from '@playwright/test';
import { Base } from '../base';
import { Pageable } from './../../util/fixtures';

export class connectionTypeSetup extends Base implements Pageable {
  readonly page: Page
  readonly path: string

  readonly connectionTypeCheckbox: Locator

  constructor(page: Page) {
    super(page)

    this.page = page
    this.path = '/connection-type'

    this.connectionTypeCheckbox =  page.getByText('Username/Password Connection (PPPoE)')
    
  }
}