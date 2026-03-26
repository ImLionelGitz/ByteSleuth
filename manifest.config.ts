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
  },

  background: {
    service_worker: "src/background/background.ts"
  },

  web_accessible_resources: [{
    resources: ['src/popup/index.html'],
    matches: ['<all_urls>'],
    use_dynamic_url: true
  }],

  content_scripts: [{
    matches: ["<all_urls>"],
    js: ["src/content/main.ts"]
  }],
})
