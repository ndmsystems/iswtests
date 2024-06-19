import { Page, test as base } from '@playwright/test'
import { A } from '../page-objects/a'
import { AutoUpdate } from '../page-objects/common-end/auto-update'
import { Congratulate } from '../page-objects/common-end/congratulate'
import { DigitalCertificates } from '../page-objects/common-end/digital-certificates'
import { ProductImprovement } from '../page-objects/common-end/product-improvement'
import { WiFiNetworkSettings } from '../page-objects/common-end/wifi-settings'
import { YourKeeneticCredentials } from '../page-objects/common-end/your-keenetic-credentials'
import { DevicePrivacyNotice } from '../page-objects/common-start/device-privacy-notice'
import { Password } from '../page-objects/common-start/password'
import { SelectConfigurationOption } from '../page-objects/common-start/select-configuration-option'
import { SelectCountryOrRegion } from '../page-objects/common-start/select-country-or-region'
import { TermsAndPrivacy } from '../page-objects/common-start/terms-and-privacy'
import { Welcome } from '../page-objects/common-start/welcome'
import { connectionTypeSetup } from '../page-objects/ethernet-scenario/connection-type'
import { iptvVlanSetup } from '../page-objects/ethernet-scenario/iptv-vlan-setup'
import { pppoeSetup } from '../page-objects/ethernet-scenario/ppoe-setup'
import { SelectWanPort } from '../page-objects/ethernet-scenario/select-wan-port'
import { TvOption } from '../page-objects/ethernet-scenario/tv-option'
import { UnplugModem } from '../page-objects/ethernet-scenario/unplug-modem'

export interface Pageable {
  page: Page
  path: string
}

interface Pages {
  welcomePage: Welcome
  selectConfigurationOptionPage: SelectConfigurationOption
  devicePrivacyNoticePage: DevicePrivacyNotice
  selectCountryOrRegionPage: SelectCountryOrRegion
  termsAndPrivacyPage: TermsAndPrivacy
  passwordPage: Password
  selectWanPortPage: SelectWanPort
  unplugModemPage: UnplugModem
  tvOptionPage: TvOption
  vlanInformationPage: iptvVlanSetup
  connectionSelectPage: connectionTypeSetup
  pppoeSetupPage: pppoeSetup
  autoUpdatePage: AutoUpdate
  wifiSettingsPage: WiFiNetworkSettings
  digitalCertificatesPage: DigitalCertificates
  productImprovementPage: ProductImprovement
  yourKeeneticCredentialsPage: YourKeeneticCredentials
  congratulate: Congratulate
  a: A
}

export const test = base.extend<Pages>({
  page: async ({ page }, use) => {
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.log(msg.text())
      }
    })

    // // Load initial easyconfig state to device
    // var exec = require('child_process').exec;
    // exec(`curl -v ${process.env.HOST}/rci/easyconfig/state -d @util/welcome.json`, function callback(_err, stdout) {
    //   console.log(stdout)
    // });

   
    // let mocked = 0
    // await page.route('/rci/', async route => {
    // console.log('main')

    //   if (route.request().method() !== 'POST') {
    //     route.continue()
    //     return
    //   }

    //   const response = await route.fetch();

    //   if (!response.ok()) {
    //     route.continue()
    //     return
    //   }

    //   const json = await response.json()

    //   if (json.constructor === Array && 'show' in json[0] && 'last-change' in json[0].show) {
    //     let root = json[0]['show']['last-change']

    //     if (mocked < 5) {
    //       console.log('Setting agent to default')
    //       json[0]['show']['last-change']['agent'] = 'default'
    //       mocked++
    //     }
    //   }
    //   await route.fulfill({ response, json });
    // })

    await use(page)
  },

  welcomePage: async ({ page }, use) => {
    const welcome = new Welcome(page)
    await page.goto(welcome.path)

    await use(welcome)
  },

  selectConfigurationOptionPage: async ({ page }, use) => {
    const selconfopt = new SelectConfigurationOption(page)
    await use(selconfopt)
  },

  devicePrivacyNoticePage: async ({ page }, use) => {
    const dpn = new DevicePrivacyNotice(page)
    await use(dpn)
  },

  selectCountryOrRegionPage: async ({ page }, use) => {
    const scor = new SelectCountryOrRegion(page)
    await use(scor)
  },

  termsAndPrivacyPage: async ({ page }, use) => {
    const terms = new TermsAndPrivacy(page)
    await use(terms)
  },

  passwordPage: async ({ page }, use) => {
    const pwd = new Password(page)
    await use(pwd)
  },

  selectWanPortPage: async ({ page }, use) => {
    const swp = new SelectWanPort(page)
    await use(swp)
  },

  unplugModemPage: async ({ page }, use) => {
    const ump = new UnplugModem(page)
    await use(ump)
  },

  tvOptionPage: async ({ page }, use) => {
    const tv = new TvOption(page)
    await use(tv)
  },

  vlanInformationPage: async ({ page }, use) => {
    const vip = new iptvVlanSetup(page)
    await use(vip)
  },

  connectionSelectPage: async ({ page }, use) => {
    const csp = new connectionTypeSetup(page)
    await use(csp)
  },

  pppoeSetupPage: async ({ page }, use) => {
    const ps = new pppoeSetup(page)
    await use(ps)
  },
  autoUpdatePage: async ({ page }, use) => {
    const au = new AutoUpdate(page)
    await use(au)
  },

  wifiSettingsPage: async ({ page }, use) => {
    const wf = new WiFiNetworkSettings(page)
    await use(wf)
  },

  digitalCertificatesPage: async ({ page }, use) => {
    const ds = new DigitalCertificates(page)
    await use(ds)
  },

  productImprovementPage: async ({ page }, use) => {
    const primpr = new ProductImprovement(page)
    await use(primpr)
  },

  yourKeeneticCredentialsPage: async ({ page }, use) => {
    const cred = new YourKeeneticCredentials(page)
    await use(cred)
  },

  congratulate: async ({ page, a }, use) => {
    const shout = new Congratulate(page)
    await use(shout)

    // Reset user password and enable user config after /congratulate page
    // await page.goto(a.path)
    // await page.waitForURL(new RegExp(a.path))
    // await a.send('no user admin password')
    // await a.send('easyconfig no disable')
  },

  a: async ({ page }, use) => {
    const aP = new A(page)
    await use(aP)
  }
})