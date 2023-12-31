import { easyConfig } from '../util/easyconfig';
import { test } from '../util/fixtures'
import { check } from '../util/check'

let has2_5G = false

test.beforeAll(async ({ request }) => {
  has2_5G = (await (await request.get(`/ndmConstants.js`, {})).text()).includes('"maxSpeed": 2500')
  console.log(`This device ${has2_5G ? 'has' : 'doesn\'t have'} a 2.5G port`)
});

test.beforeEach('common-start', async ({ 
    page,
    welcomePage, 
    selectConfigurationOptionPage, 
    devicePrivacyNoticePage,
    selectCountryOrRegionPage,
    termsAndPrivacyPage,
    passwordPage,
     }) => {
  
    let selectCountry = false
    let dpn = false
  
    await page.route('/rci/', async route => {
      if (route.request().method() !== 'POST') {
        route.continue()
        return
      }
  
      const response = await route.fetch();
  
      if (!response.ok()) {
        route.continue()
        return
      }
  
      const json = await response.json()
  
      if (json.constructor === Array && 'show' in json[0] && 'last-change' in json[0].show) {
        let root = json[0]['show']['last-change']
  
        if ('dpn-status' in root) {
          const dpnNode = root['dpn-status']
          console.log('DPN ', dpnNode)
      
          if ('select-country' in dpnNode) {
            console.log('Need to choose the country')
            selectCountry = true
          }
          else if ('accepted' in dpnNode && 'version' in dpnNode) {
            dpn = dpnNode.version < dpnNode.accepted
          }
          else {
            // DPN node is there
            dpn = true
          }
        }
      }
      await route.fulfill({ response, json });
    })
  
  await page.waitForURL(new RegExp(welcomePage.path))
  await welcomePage.runWizard(selectConfigurationOptionPage)
  
  await check(selectConfigurationOptionPage.viaEthernet)
  
  if (selectCountry) {
    await selectConfigurationOptionPage.next(selectCountryOrRegionPage)
    await selectCountryOrRegionPage.next(termsAndPrivacyPage)
  } else {
    await selectConfigurationOptionPage.next(termsAndPrivacyPage)
  }
  
  await termsAndPrivacyPage.readAndAgreeCheckbox.check()
  
  if (dpn) {
    await termsAndPrivacyPage.accept(devicePrivacyNoticePage)
    await devicePrivacyNoticePage.agree.check()
    await devicePrivacyNoticePage.accept(passwordPage)
  } else {
    await termsAndPrivacyPage.accept(passwordPage)
  }
  
  await passwordPage.password.fill('1234')
  await passwordPage.nextButton.click()
})

test.afterEach('common-end', async ({ 
  page,
  autoUpdatePage,
  wifiSettingsPage,
  digitalCertificatesPage,
  productImprovementPage,
  yourKeeneticCredentialsPage,
  congratulate,
  a
   }) => {
    await autoUpdatePage.manualUpdating.click()
  
    // Shall we see update page if we choose manual updating? /updating-firmware
    await wifiSettingsPage.next(digitalCertificatesPage)
    await digitalCertificatesPage.next(productImprovementPage)
    await productImprovementPage.refuse.click()
  
    await yourKeeneticCredentialsPage.next(congratulate)
    await congratulate.finish()

    await page.goto(a.path)
    await a.send('system configuration factory-reset')
    // Device will now reboot
})

test('NoModemNoStbNoVlanNoVlanIptvWifiDef @master', async ({
  selectWanPortPage, tvOptionPage, vlanInformationPage }) => {
  
  if (has2_5G) {
    selectWanPortPage.next(tvOptionPage)
  }
  await tvOptionPage.offTheShelfTv.check()
  await tvOptionPage.next(vlanInformationPage)
  await vlanInformationPage.withoutVlan.click()
})

test('NoModemNoStbNoVlanNoVlanIptvWifiDef @1.63', async ({ 
  selectWanPortPage, unplugModemPage, tvOptionPage, vlanInformationPage }) => {

  if (has2_5G) {
    selectWanPortPage.next(unplugModemPage)
  }

  await unplugModemPage.iHaveNoModem.click()
  await tvOptionPage.offTheShelfTv.check()
  await tvOptionPage.next(vlanInformationPage)
  await vlanInformationPage.withoutVlan.click()
})