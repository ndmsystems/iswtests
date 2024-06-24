
import { type Page } from '@playwright/test';
import { Pageable } from '../../util/fixtures';
import { Base } from '../base';

export class AutoUpdateSetting  extends Base implements Pageable  {
  readonly page: Page
  readonly path: string

 //readonly dayOfUpdating: Locator;
  

  constructor(page: Page) {
    super(page);
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