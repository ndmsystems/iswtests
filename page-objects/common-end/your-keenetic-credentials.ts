
import { type Locator, type Page } from '@playwright/test';
import { Pageable } from '../../util/fixtures';
import { run } from '../../util/helperFunctions';
import { get } from '../../util/readLocale';
import { Base } from '../base';

export class YourKeeneticCredentials extends Base implements Pageable {
  readonly page: Page
  readonly path: string

  readonly qrCode: Locator
  readonly download: Locator;
  readonly copy: Locator
  readonly print: Locator

  constructor(page: Page) {
    super(page)

    this.page = page
    this.path = '/your-keenetic-credentials'

    this.qrCode = page.locator('canvas')
    this.download = page.getByRole('button', { name: get('isw.buttons.download') })
    this.copy = page.getByRole('button', { name: get('isw.buttons.copy') })
    this.print = page.getByRole('button', { name: get('isw.buttons.print') })
  }

  async checkQrCode (): Promise<void> {
    const ss = await this.qrCode.screenshot()
    const res = run(`/usr/bin/zbarimg ss`)
    console.log(res)
    // await expect(this.responseBox,
    //   'After getting response on the command, response box should contain "prompt": "(config)"'
    // ).toContainText('"prompt": "(config)"')
  }
}