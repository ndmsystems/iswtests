
import { type Locator, type Page } from '@playwright/test';
import { Pageable } from '../../util/fixtures';
import { get } from '../../util/readLocale';

export class TermsAndPrivacy implements Pageable {
  readonly page: Page
  readonly path: string

  readonly readAndAgreeCheckbox: Locator;
  readonly acceptButton: Locator;
  
  constructor(page: Page) {
    this.page = page
    this.path = '/terms-and-privacy'

    this.readAndAgreeCheckbox = page.locator('.mat-checkbox-inner-container')

    // Footer
    this.acceptButton = page.getByRole('button', { name: get('isw.buttons.accept') })
  }

  async accept(page: Pageable) {
    await this.acceptButton.click()
    await this.page.waitForURL(new RegExp(page.path))
  }
}