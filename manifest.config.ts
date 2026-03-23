import { defineManifest } from '@crxjs/vite-plugin'
import pkg from './package.json'

export default defineManifest({
  manifest_version: 3,
  name: pkg.name,
  description: pkg.description,
  version: pkg.version,
  icons: {
    48: 'public/logo.png',
  },

  permissions: ["activeTab", "scripting", "storage"],
  host_permissions: ["<all_urls>"],

  action: {
    default_icon: {
      48: 'public/logo.png',
    },
    default_popup: 'src/popup/index.html',
  },

  background: {
    service_worker: "src/background/background.ts"
  },

  content_scripts: [{
    matches: ["<all_urls>"],
    js: ["src/content/content.ts"]
  }],
})
