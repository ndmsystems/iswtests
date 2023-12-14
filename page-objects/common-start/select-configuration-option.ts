
import { type Locator, type Page } from '@playwright/test';
import { Pageable } from './../../util/fixtures'
import { get } from '../../util/readLocale';
import { Base } from '../base';

enum Type {
  DEVICES_WITHOUT_VIA_USB_MODEM_OPTION,
  RESTORE_CONFIGURATION,
  SWITCH_TO_EXTENDER,
  VIA_DSL,
  VIA_SFP,
  VIA_DSL_RU,
  VIA_ETHERNET,
  VIA_INTERNAL_MODEM,
  VIA_USB_MODEM,
  WIZARD_CHOICES,
  EXTENDER_WIZARD_CHOICES,
  SETUP_EXTENDER,
  ONLY_RUSSIAN_DSL_DEVICE,
  BUDDY_WIZARD_CHOICES,
  BUDDY_BRIDGE,
  BUDDY_ACCESS_POINT,
  BUDDY_EXTENDER,
  BUDDY_MESH
}

export class SelectConfigurationOption extends Base implements Pageable {
  readonly page: Page
  readonly path: string

  readonly viaSfp: Locator
  readonly viaDsl: Locator
  readonly viaEthernet: Locator
  readonly viaUsbModem: Locator
  readonly switchToExtender: Locator

  readonly exitWizard: Locator

  constructor(page: Page) {
    super()

    this.page = page
    this.path = '/select-configuration-option'

    this.viaSfp = page.getByText(`input[value=${Type[Type.VIA_SFP]}]`)
    this.viaDsl = page.getByText(`input[value=${Type[Type.VIA_DSL]}]`)
    this.viaEthernet = page.locator(`input[value=${Type[Type.VIA_ETHERNET]}]`)
    this.viaUsbModem = page.getByText(`input[value=${Type[Type.VIA_USB_MODEM]}]`)
    this.switchToExtender = page.getByText(`input[value=${Type[Type.SWITCH_TO_EXTENDER]}]`)
   
    this.exitWizard = page.getByRole('button', { name: get('isw.buttons.exit-wizard') })
  }
}