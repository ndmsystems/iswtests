import dotenv from 'dotenv'
import { type FullConfig } from '@playwright/test'
import { writeFileSync } from 'fs';
import { join } from 'path';

async function globalSetup(_config: FullConfig ) {
  dotenv.config()

  var exec = require('child_process').exec;
  exec(`curl ${process.env.HOST}/language/locale.en.json`, function callback(_err, stdout) {
    writeFileSync(join(__dirname, 'localization/device.en.json'), stdout, {
      flag: 'w',
    });
  });

  // exec(`curl ${process.env.HOST}/rci/easyconfig/state`, function callback(_err, stdout) {
  //   let obj = JSON.parse(stdout)
  //   let value = JSON.parse(obj.value)
  //   value.startStep = 'wizards/initial-setup/welcome'
    
  //   let c = {}
  //   c['value'] = JSON.stringify(value)
  //   writeFileSync(join(__dirname, 'util/welcome.json'), JSON.stringify(c), {
  //     flag: 'w',
  //   });
  // });
}

export default globalSetup