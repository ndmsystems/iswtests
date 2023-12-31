import { expect, type Locator, type Page } from '@playwright/test'
import { Pageable } from '../util/fixtures'
import { get } from '../util/readLocale'

export class A implements Pageable {
  public readonly path = '/a'

  readonly input: Locator
  readonly sendRequestButton: Locator
  readonly responseBox: Locator
  readonly clearResponse: Locator

  constructor (public readonly page: Page) {
    this.input = page.getByRole('textbox')
    this.sendRequestButton = page.getByRole('button', { name: get('cli.parse.send') })
    this.responseBox = page.locator('.cli-parse__json-wrapper')
    this.clearResponse = page.getByRole('button', { name: get('cli.parse.clear') }).nth(1)
  }

  async send (command: string): Promise<void> {
    await this.input.waitFor()
    await this.input.fill(command)
    await this.sendRequestButton.click()
    await expect(this.responseBox).toContainText('"prompt": "(config)"')
    await this.clearResponse.click()
  }
}