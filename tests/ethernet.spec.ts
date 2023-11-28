import { expect } from '@playwright/test'
import { test } from '../util/fixtures'

test.beforeAll(async () => {
  var exec = require('child_process').exec;
  exec('curl -v 172.16.99.5:8096/rci/easyconfig/state -d @util/welcome.json', function callback(error, stdout, stderr) {
    console.log(stdout)
  });
});

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

  await welcomePage.next(selectConfigurationOptionPage)
  await expect(selectConfigurationOptionPage.nextButton).toBeDisabled()

  await selectConfigurationOptionPage.via_ethernet.check()
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

  // Shall we see update page if we choose manual updating? /updating-firmware
  await wifiSettingsPage.next(digitalCertificatesPage)
  await digitalCertificatesPage.next(productImprovementPage)
  await productImprovementPage.refuse.click()
  await yourKeeneticCredentialsPage.next(shoutIfYouNeedHelpPage)
  await shoutIfYouNeedHelpPage.finish()
});