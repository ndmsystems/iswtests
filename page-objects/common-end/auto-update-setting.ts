
import { type Locator, type Page } from '@playwright/test';
import { get } from '../../util/readLocale';
import { Base } from '../base';
import { Pageable } from '../../util/fixtures';

export class AutoUpdateSetting  extends Base implements Pageable  {
  readonly page: Page
  readonly path: string

 //readonly dayOfUpdating: Locator;
  

  constructor(page: Page) {
    super();
    this.page = page
    this.path = '/auto-update-schedule'
    
    // this.dayOfUpdating = page.getByRole('button', { name: get('time.weekday.0') })
    // this.dayOfUpdating = page.getByRole('button', { name: get('time.weekday.1') })
    // this.dayOfUpdating = page.getByRole('button', { name: get('time.weekday.2') })
    // this.dayOfUpdating = page.getByRole('button', { name: get('time.weekday.3') })
    // this.dayOfUpdating = page.getByRole('button', { name: get('time.weekday.4') })
    // this.dayOfUpdating = page.getByRole('button', { name: get('time.weekday.5') })
    // this.dayOfUpdating = page.getByRole('button', { name: get('time.weekday.6') })

    
  }
}