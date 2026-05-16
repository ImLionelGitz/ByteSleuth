import { defineConfig } from 'wxt';
import tailwindcss from '@tailwindcss/vite'

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  
  vite: () => ({
    plugins: [tailwindcss()]
  }),

  manifest: {
    action: {},
    host_permissions: ["<all_urls>"],
    permissions: ['storage'],

    web_accessible_resources: [{
      resources: ['barrier.html'],
      matches: ['<all_urls>']
    }]
  }
});
