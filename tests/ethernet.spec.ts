import { check } from '../util/check';
import { test } from '../util/fixtures';

let has2_5G = false

test.beforeAll(async ({ request }) => {
  has2_5G = (await (await request.get(`/ndmConstants.js`, {})).text()).includes('"maxSpeed": 2500')
  console.log(`This device ${has2_5G ? 'has' : 'doesn\'t have'} a 2.5G port`)
});

test.beforeEach('common-start', async ({ 
    page,
    selectConfigurationOptionPage, 
    devicePrivacyNoticePage,
    selectCountryOrRegionPage,
    termsAndPrivacyPage,
    passwordPage,
    connectionSelectPage,
    welcomePage
     }) => {
  
    let selectCountry = false
    let dpn = false
    test.setTimeout(60_000)
    let mocked = false

    await page.route('/rci/', async route => {
      if (route.request().method() !== 'POST') {
        await route.continue()
        return
      }
  
      const response = await route.fetch();
  
      if (!response.ok()) {
        await route.continue()
        return
      }
  
      const json = await response.json()
      
      // if (page.url().includes('password')) {
      //   mocked = true
      // }

      // if (!mocked && json.constructor === Array && 'show' in json[0] && 'last-change' in json[0].show) {
      //   console.log('Setting agent to default')
      //   json[0]['show']['last-change']['agent'] = 'default'

      //   await route.fulfill({ response, json })
      //   return
      // }

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
      await route.continue()
    })
  
  await page.goto('wizards/initial-setup/welcome')
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
  // We use click here instead of next() method, because we don't know what page will be next 
  await passwordPage.nextButton.click()
})

test.afterEach('common-end', async ({ 
  page,
  autoUpdatePage,
  autoUpdateSettingPage,
  wifiSettingsPage,
  digitalCertificatesPage,
  productImprovementPage,
  yourKeeneticCredentialsPage,
  congratulate,
  a
   }) => {
    test.setTimeout(300_000)

    console.log('AutoUpdate Page');
    await autoUpdatePage.enableAutomaticUpdates.click()
    console.log('Select Preferred Times for Automatic Updates');
    await autoUpdateSettingPage.next(wifiSettingsPage)
    // Shall we see update page if we choose manual updating? /updating-firmware
    await wifiSettingsPage.next(digitalCertificatesPage)
    await digitalCertificatesPage.next(productImprovementPage)
    await productImprovementPage.refuse.click()
    await yourKeeneticCredentialsPage.checkQrCode()
    // await yourKeeneticCredentialsPage.next(congratulate)
    // await congratulate.finish()


    // await page.goto(a.path)
    // await a.send('system configuration factory-reset')
    // Device will now reboot
})
//ndw3: 1.78-3-g197c7e0c
test('PwEthIPoENoModemNoStbNoVlanNoVlanIptvWifiDef', async ({
  selectWanPortPage, tvOptionPage, vlanInformationPage }) => {  
  if (has2_5G) {
    selectWanPortPage.next(tvOptionPage)
  }
  await tvOptionPage.offTheShelfTv.check()
  await tvOptionPage.next(vlanInformationPage)
  await vlanInformationPage.page.waitForTimeout(3_000)
  await vlanInformationPage.withoutVlan.click()
})

test('PwEthPPPoENoModemNoStbNoVlanNoVlanIptvWifiDef', async ({
  selectWanPortPage, tvOptionPage, vlanInformationPage, connectionSelectPage, pppoeSetupPage }) => {

  if (has2_5G) {
    selectWanPortPage.next(tvOptionPage)
  }
  await tvOptionPage.offTheShelfTv.check()
  await tvOptionPage.next(vlanInformationPage)
  await vlanInformationPage.withoutVlan.click()

  await vlanInformationPage.next(connectionSelectPage)
  await connectionSelectPage.connectionTypeCheckbox.check()
  await connectionSelectPage.next(pppoeSetupPage)
  //await connectionSelectPage.back(vlanInformationPage)
  //await vlanInformationPage.withoutVlan.click()
  //await vlanInformationPage.next(connectionSelectPage)

  //optional: check for special characters in the login and password fields
  await pppoeSetupPage.pppoeLogin.fill('".|/[|^/$(`%~#/^[|$/,:=)')
  await pppoeSetupPage.pppoePassword.fill('".|/[|^/$(`%~#/^[|$/,:=)')
  await pppoeSetupPage.pppoeApplyButton.click()
})
