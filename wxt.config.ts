import { defineConfig } from 'wxt';
import tailwindcss from '@tailwindcss/vite'

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  
  vite: () => ({
    plugins: [tailwindcss()],
    build: {
      rolldownOptions: {
        output: {
          codeSplitting: {
            groups: [
              {
                name: 'prettier-bundle',
                // Isolates Prettier core and the TS plugin into its own chunk
                test: /\/node_modules\/prettier\//, 
                priority: 10,
              },
            ],
          },
        },
      },
    },
  }),

  manifest: {
    name: 'ByteSleuth',
    action: {},
    host_permissions: ["<all_urls>"],
    permissions: ['storage', 'userScripts', 'unlimitedStorage'],
  }
});
