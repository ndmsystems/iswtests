
import { type Page } from '@playwright/test';
import { Pageable } from '../../util/fixtures';
import { Base } from '../base';

export class DigitalCertificates extends Base implements Pageable {
  readonly page: Page
  readonly path: string

  constructor(page: Page) {
    super(page)

    this.page = page
    this.path = '/digital-certificates'
  }
}