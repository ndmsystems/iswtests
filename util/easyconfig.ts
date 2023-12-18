import { getCookie } from './authenticate';

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

  export async function easyConfig(): Promise<EasyConfig> {
    console.log('Requesting easyconfig')

    let response = await fetch(url)
    console.log(response.status)

    if (response.status === 401) {
      response = await fetch(url, {
        headers: {'Cookie': await getCookie() || ''}
      })
    }

    let data = await response.json()
    console.log(data.value)
    return await JSON.parse(data.value)
  }
