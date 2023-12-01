import fs from 'fs'
import path from 'path'

const localeEnFilePath = path.join(__dirname, `../localization/locale.en.json`)
const enDict = JSON.parse(fs.readFileSync(localeEnFilePath, 'utf8'))

export const get = (key: string): any => {
  return internalGet(key, enDict)
}

const internalGet = (key: string, root: any): any => {
  const keys = key.split('.')
  let value = root

  for (const k of keys) {
    if (value != null && typeof value === 'object' && k in value) {
      value = value[k]
    } else {
      return undefined
    }
  }

  return value.replace(/<[^>]*>/g, '') // Remove HTML tags if any
}
