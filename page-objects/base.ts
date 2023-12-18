import { Pageable } from '../util/fixtures'
import { get } from '../util/readLocale'

export class Base {
  async next(page: Pageable) {
    let nextButton = page.page.getByRole('button', { name: get('isw.buttons.next') })

    await nextButton.waitFor()
    await nextButton.click()
    await page.page.waitForURL(new RegExp(page.path))
  }
}