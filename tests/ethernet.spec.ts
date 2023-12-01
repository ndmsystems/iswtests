import { expect } from '@playwright/test'
import { test } from '../util/fixtures'

test('ethernet', async ({ page, request,
    welcomePage, 
    selectConfigurationOptionPage, 
    devicePrivacyNoticePage,
    passwordPage,
    unplugModemPage,
    tvOptionPage,
    autoUpdatePage,
    wifiSettingsPage,
    digitalCertificatesPage,
    productImprovementPage,
    yourKeeneticCredentialsPage,
    shoutIfYouNeedHelpPage
     }) => {

  await page.waitForURL(new RegExp(welcomePage.path))
  await welcomePage.next(selectConfigurationOptionPage)

  await selectConfigurationOptionPage.viaEthernet.check()
  await selectConfigurationOptionPage.next(passwordPage)
  // await devicePrivacyNoticePage.agreeCheckbox.check()
  // await devicePrivacyNoticePage.next(passwordPage)

  await expect(passwordPage.nextButton).toBeDisabled()
  await passwordPage.password.fill('1234')
  await passwordPage.next(unplugModemPage)

  await unplugModemPage.iHaveNoModem.click()
  await tvOptionPage.offTheShelfTv.check()
  await tvOptionPage.nextButton.click()
  await autoUpdatePage.manualUpdating.click()

  await page.waitForURL(new RegExp(wifiSettingsPage.path))

  // Shall we see update page if we choose manual updating? /updating-firmware
  await wifiSettingsPage.next(digitalCertificatesPage)
  await digitalCertificatesPage.next(productImprovementPage)
  await productImprovementPage.refuse.click()
  await page.waitForURL(new RegExp(yourKeeneticCredentialsPage.path))

  await yourKeeneticCredentialsPage.next(shoutIfYouNeedHelpPage)
  await shoutIfYouNeedHelpPage.finish()
});