import { Page, test as base } from '@playwright/test'
import { Welcome } from '../page-objects/common-start/welcome'
import { SelectConfigurationOption } from '../page-objects/common-start/select-configuration-option'
import { DevicePrivacyNotice } from '../page-objects/common-start/device-privacy-notice'
import { Password } from '../page-objects/common-start/password'
import { UnplugModem } from '../page-objects/ethernet-scenario/unplug-modem'
import { TvOption } from '../page-objects/ethernet-scenario/tv-option'
import { AutoUpdate } from '../page-objects/common-end/auto-update'
import { WiFiNetworkSettings } from '../page-objects/common-end/wifi-settings'
import { DigitalCertificates } from '../page-objects/common-end/digital-certificates'
import { ProductImprovement } from '../page-objects/common-end/product-improvement'
import { YourKeeneticCredentials } from '../page-objects/common-end/your-keenetic-credentials'
import { ShoutIfYouNeedHelp } from '../page-objects/common-end/congratulate'
import { A } from '../page-objects/a'

export interface Pageable {
  page: Page
  path: string
}

interface MyFixtures {
  welcomePage: Welcome
  selectConfigurationOptionPage: SelectConfigurationOption
  devicePrivacyNoticePage: DevicePrivacyNotice
  passwordPage: Password
  unplugModemPage: UnplugModem
  tvOptionPage: TvOption
  autoUpdatePage: AutoUpdate
  wifiSettingsPage: WiFiNetworkSettings
  digitalCertificatesPage: DigitalCertificates
  productImprovementPage: ProductImprovement
  yourKeeneticCredentialsPage: YourKeeneticCredentials
  shoutIfYouNeedHelpPage: ShoutIfYouNeedHelp
  a: A
}

export const test = base.extend<MyFixtures>({
  page: async ({ page }, use) => {
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.log(msg.text())
      }
    })

    // Load initial easyconfig state to device
    var exec = require('child_process').exec;
    exec('curl -v 172.16.99.5:8096/rci/easyconfig/state -d @util/welcome.json', function callback(error, stdout, stderr) {
      console.log(stdout)
    });

    await use(page)
  },

  welcomePage: async ({ page }, use) => {
    const welcome = new Welcome(page)
    await page.goto(welcome.path)

    let mocked = 0
    await page.route('/rci/', async route => {
      if (mocked > 1 || route.request().method() !== 'POST') {
        route.continue()
        return
      }

      const response = await route.fetch();
      const json = await response.json()
    
      if (json.constructor === Array && 'show' in json[0] && 'last-change' in json[0].show) {
        mocked++
        console.log('Setting agent to default')
        json[0]['show']['last-change']['agent'] = 'default'
      }
      await route.fulfill({ response, json });
    })

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

  passwordPage: async ({ page }, use) => {
    const pwd = new Password(page)
    await use(pwd)
  },

  unplugModemPage: async ({ page }, use) => {
    const ump = new UnplugModem(page)
    await use(ump)
  },

  tvOptionPage: async ({ page }, use) => {
    const tv = new TvOption(page)
    await use(tv)
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

  shoutIfYouNeedHelpPage: async ({ page, a }, use) => {
    const shout = new ShoutIfYouNeedHelp(page)
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