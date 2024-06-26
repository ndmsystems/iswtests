import dotenv from 'dotenv';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { run } from './util/helperFunctions';

export default async (): Promise<void> => {
  dotenv.config()

  // const ec = await requestEasyConfig()
  // const prettyEc = JSON.stringify(ec, null, 2);
  // writeFileSync(join(__dirname, 'util/welcome.json'), prettyEc)

  let dict = run(`curl ${process.env.HOST}/language/locale.en.json`)
  writeFileSync(join(__dirname, 'localization/device.en.json'), dict)
}