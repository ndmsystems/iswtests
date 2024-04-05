import { Pageable } from '../util/fixtures'
import { get } from '../util/readLocale'

export class Base {
  async next(page: Pageable) {
    let nextButton = page.page.getByRole('button', { name: get('isw.buttons.next') })

    await nextButton.waitFor()
    await nextButton.click()
    console.log('next:', page.path)

    await page.page.waitForURL(new RegExp(page.path))
  }

  async back(page: Pageable) {
    let backButton = page.page.getByRole('button', { name: get('isw.buttons.back') })

    await backButton.waitFor()
    await backButton.click()
    console.log('back:', page.path)

    await page.page.waitForURL(new RegExp(page.path))
  }

}