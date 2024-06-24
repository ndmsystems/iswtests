import { APIRequestContext, Page } from '@playwright/test';
import dotenv from 'dotenv';
import { getCookie } from './authenticate';
dotenv.config()

const url = `${process.env.HOST}/rci/easyconfig/state`

interface DslConfig {
    mode: string;
    vpi: boolean;
    vci: boolean;
    encapsulation: string;
    vlan: boolean;
  }
  
  interface IptvDslConfig {
    vpi: number | null;
    vci: number | null;
    encapsulation: string;
    vlan: number | null;
  }
  
  interface VlanConfig {
  }
  
  interface IpConfig {
    mode: string;
    address: string;
    mask: string;
    gateway: string;
    dns: string[];
  }
  
  interface OsUpdateData {
    updateAvailable: boolean;
    updateTitle: string;
    updateOsVersion: string;
    releaseDate: Date | false;
    notesLink: string | false;
  }
  
  interface BuddyWifiStationSettings {
    address: string;
    ssid: string;
    band: string;
    encryption: string;
    psk: string;
  }
  
  interface BuddyAccessPointSettings {
    2: {
      ssid: string;
      encryption: string;
      psk: string;
    };
    5: {
      ssid: string;
      encryption: string;
      psk: string;
    };
    syncWifiSettings: boolean;
  }
  
  interface EasyConfig {
    isManuallyStarted: boolean;
    language: string;
    startStep: string;
    serviceTag: string;
    systemMode: string;
    isDeviceInMainMode: boolean;
    isManualSetupSelected: boolean;
    isCustomStbIptvSelected: boolean;
    isKeeneticConnectedToModem: boolean;
    isReviewIspSettingsVisited: boolean;
    setupExtenderScenarioSelected: boolean;
    switchToExtenderSelected: boolean;
    extenderPath: string;
    restoreConfigurationSelected: boolean;
    password: string;
    ipoeExists: boolean;
    ispType: string;
    selectedConfigurationOption: string;
    internalLteScenarioSelected: boolean;
    sfpEthernetScenarioSelected: boolean;
    ethernetModemScenarioSelected: boolean;
    macConfigMode: string;
    macConfigAddress: string;
    dslConfig: DslConfig;
    dslManualConfigStepVisited: boolean;
    iptvDslConfig: IptvDslConfig;
    vlanConfig: VlanConfig;
    ipConfig: IpConfig;
    extenderConnectionInfo: {
    address: string;
    mac: string;
    };
    ethernetIsp: null | any; // Add the specific type for ethernetIsp
    ethernetIspListAvailable: boolean;
    mobileIsp: null | any; // Add the specific type for mobileIsp
    dslIsp: null | any; // Add the specific type for dslIsp
    isDslIspSelectedFromBase: boolean;
    isEasyLoginEnabled: boolean;
    internetCheckStepBackLink: null | any; // Add the specific type for internetCheckStepBackLink
    internetAccessCheckedOnce: boolean;
    tunnelType: string;
    tunnelIdentity: string;
    tunnelPassword: string;
    tunnelAddress: string;
    tunnelAuthErrorsToSkip: number;
    timezone: string;
    country: string;
    wanPort: string;
    lteParams: null | any; // Add the specific type for lteParams
    lteReviewVisited: boolean;
    usbModemIsAutoconfigured: boolean;
    usbModemConnectionCheckedOnce: boolean;
    usbModemData: null | any; // Add the specific type for usbModemData
    autoUpdateEnabled: boolean;
    autoUpdateFrom: number;
    autoUpdateTo: number;
    autoUpdateDays: boolean[];
    autoUpdateScheduleCreated: boolean;
    autoUpdateScheduleId: string;
    autoUpdateStepVisited: boolean;
    osUpdateData: OsUpdateData;
    osUpdateRequired: boolean;
    osUpdateStarted: boolean;
    osUpdateFinished: boolean;
    languagesInRecommendedPreset: string[];
    isFactoryModuleInstalled: boolean;
    defaultDomainName: string;
    isBuddyExtenderScenarioSelected: boolean;
    isBuddyMeshScenarioSelected: boolean;
    isBuddyAccessPointScenarioSelected: boolean;
    isBuddyBridgeScenarioSelected: boolean;
    isAnyBuddyScenarioSelected: boolean;
    buddyWifiStationSettings: BuddyWifiStationSettings;
    buddyAccessPointSettings: BuddyAccessPointSettings;
    connectionType: string;
    wanMac: string;
    iptvDedicatedPort: string;
  }

  export const requestEasyConfig = async (): Promise<EasyConfig> => {
    let response = await fetch(url)
    console.log('Requesting easy config...', response.status)

    if (response.status === 401) {
      response = await fetch(url, {
        headers: {'Cookie': await getCookie() || ''}
      })
    }

    let data = await response.json()
    const ec = await JSON.parse(data.value)

    ec.startStep = 'wizards/initial-setup/welcome'
    return ec
  }

  export const loadEasyConfig = async (page: Page, request: APIRequestContext): Promise<void> => {
    let mocked = 0
    await page.route('/rci/', async route => {
      console.log('here')
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

      if (json.constructor === Array && 'show' in json[0] && 'last-change' in json[0].show) {
        if (mocked < 35) {
          console.log('Setting agent to default')
          json[0]['show']['last-change']['agent'] = 'default'
          mocked++
        }
      }
      await route.fulfill({ response, json });
    })

    const value = await requestEasyConfig()
    const toLoad = `{"value":"${JSON.stringify(value).replace(/"/g, '\\"')}"}`
    const response = await request.post('/rci/easyconfig/state', { data: toLoad })

    if (response.status() !== 200) {
      const responseAuth = await request.post('/rci/easyconfig/state',
        {
          headers: {'Cookie': await getCookie() || ''},
          data: toLoad
        }
      )

      console.log('Response status: ', responseAuth.status())
    }
    // console.log(run(`curl ${process.env.HOST}/rci/easyconfig/state -d '${toLoad}'`))
  }