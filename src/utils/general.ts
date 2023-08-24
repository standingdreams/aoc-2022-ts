import * as fs from 'fs'
import * as path from 'path'

export function getText(rootPath: string, file: string) {
  return fs.readFileSync(path.join(rootPath, file ), 'utf8');
}