import { Pageable } from '../util/fixtures'
import { get } from '../util/readLocale'

export class Base {
  async next(page: Pageable) {
    await page.page.getByRole('button', { name: get('isw.buttons.next') }).click()
    await page.page.waitForURL(new RegExp(page.path))
  }
}