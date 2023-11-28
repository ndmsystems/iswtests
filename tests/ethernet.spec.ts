import { expect } from '@playwright/test'
import { test } from '../util/fixtures'


test('ethernet', async ({ page, request,
    welcomePage, 
    selectConfigurationOptionPage, 
    devicePrivacyNoticePage,
    passwordPage
     }) => {

  await welcomePage.next(selectConfigurationOptionPage)

  await selectConfigurationOptionPage.via_ethernet.check()
  await selectConfigurationOptionPage.next(devicePrivacyNoticePage)
  await devicePrivacyNoticePage.agreeCheckbox.check()
  await devicePrivacyNoticePage.next(passwordPage)
});