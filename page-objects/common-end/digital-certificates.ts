
import { type Locator, type Page } from '@playwright/test';
import { ProductImprovement } from './product-improvement';
import { Base } from '../base';
import { Pageable } from '../../util/fixtures';

export class DigitalCertificates extends Base implements Pageable {
  readonly page: Page
  readonly path: string

  constructor(page: Page) {
    super()

    this.page = page
    this.path = '/digital-certificates'
  }
}