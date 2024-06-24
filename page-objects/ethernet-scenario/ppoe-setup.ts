import { type Locator, type Page } from '@playwright/test';
import { Base } from '../base';
import { Pageable } from './../../util/fixtures';

export class pppoeSetup extends Base implements Pageable {
  readonly page: Page
  readonly path: string

  readonly pppoeLogin: Locator
  readonly pppoePassword: Locator
  readonly pppoeApplyButton: Locator

  constructor(page: Page) {
    super(page)

    this.page = page
    this.path = '/enter-your-credentials-pppoe'
    
    this.pppoeLogin = page.getByLabel('Username')
    this.pppoePassword =  page.getByLabel('Password')
    this.pppoeApplyButton = page.getByRole('button', { name: 'Next' })

  }


}