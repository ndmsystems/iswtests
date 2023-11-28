import { test as base } from '@playwright/test'
import { Welcome } from '../page-objects/common-start/welcome'
import { SelectConfigurationOption } from '../page-objects/common-start/select-configuration-option'
import { DevicePrivacyNotice } from '../page-objects/common-start/device-privacy-notice'
import { Password } from '../page-objects/common-start/password'

interface MyFixtures {
  welcomePage: Welcome
  selectConfigurationOptionPage: SelectConfigurationOption
  devicePrivacyNoticePage: DevicePrivacyNotice
  passwordPage: Password
}

export const test = base.extend<MyFixtures>({
  page: async ({ page }, use) => {
           // Mock the api call before navigating
    await page.route('/rci/', async route => {
    const response = await route.fetch();
    const json = await response.json();
    // if (json['show'] && 'last-change' in json['show']) {
    //   json['show']['last-change']['agent'] = 'default'
    //   json['show']['last-change']['date'] = ''
    //   json['whoami']['agent'] = 'default'
    //   console.log(' NOW ', json)
    // }
    if (json.constructor === Array && 'show' in json[0] && 'last-change' in json[0].show) {
      console.log('array!', json)
      json[0]['show']['last-change']['agent'] = 'default'
    }
    await route.fulfill({ response, json });
  })
    page.on('console', msg => {
      if (msg.type() === 'error' && !msg.text().includes('JSHandle@object')) {
        console.log(msg.text())
      }
    })
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

  passwordPage: async ({ page }, use) => {
    const pwd = new Password(page)
    await use(pwd)
  }
})