// generate stub index.html files for dev entry
import fs from 'fs-extra'
import chokidar from 'chokidar'
import { getManifest } from '../src/manifest'
import { r, port, isDev, log, isFirefoxInArg } from './utils'

/**
 * Stub index.html to use Vite in development
 */
async function stubIndexHtml() {
 const views = ['options', 'popup']

 for (const view of views) {
  await fs.ensureDir(r(`extension/dist/${view}`))
  let data = await fs.readFile(r(`views/${view}/index.html`), 'utf-8')
  data = data.replace(
   '"./main.tsx"',
   `"http://localhost:${port}/${view}/main.tsx"`,
  )
  // .replace('<div id="root"></div>', '<div id="root">Vite server did not start</div>')
  await fs.writeFile(r(`extension/dist/${view}/index.html`), data, 'utf-8')
  log('PRE', `stub ${view}`)
 }
}

export async function writeManifest() {
 if (isDev && !isFirefoxInArg)
  // Alert HMR
  log(
   'ALERT!',
   "Development in chrome doesn't support HMR, use Firefox instead",
  )

 await fs.writeJSON(
  r('extension/manifest.json'),
  await getManifest(isFirefoxInArg),
  {
   spaces: 2,
  },
 )
 log('PRE', 'write manifest.json')
}

// Initial Write
writeManifest().then(() => log('PRE', 'Manifest Created'))

// HMR is supported only on manifest v2 (firefox), manifest v3 block external script with content security policy
if (isDev) {
 if (isFirefoxInArg)
  // Run HMR for FIREFOX development env
  chokidar.watch(r('views/**/*.html')).on('change', () => {
   stubIndexHtml().then(() => log('PRE', 'Html Updated'))
  })

 // Run for all development env
 chokidar.watch([r('src/manifest.ts'), r('package.json')]).on('change', () => {
  writeManifest().then(() => log('PRE', 'Manifest Updated'))
 })
}
