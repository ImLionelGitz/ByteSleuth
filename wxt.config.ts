import { defineConfig } from 'wxt';
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from 'rollup-plugin-visualizer'

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],

  vite: ({ mode }) => {
    const plugins = [tailwindcss()]

    if (mode === 'production') {
      plugins.push(
        visualizer({
          filename: '.wxt/bundle-analysis.html', // The file name generated in your project root
          open: true,                        // Automatically opens the report in your default browser
          gzipSize: true,                    // Shows you the actual compressed transfer size
          brotliSize: true,
        })
      )
    }

    return {
      plugins: plugins,
      build: {
        minify: 'esbuild',
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
    }
  },

  manifest: {
    name: 'ByteSleuth',
    action: {},
    host_permissions: ["<all_urls>"],
    optional_permissions: ['userScripts'],
    permissions: ['storage', 'unlimitedStorage', 'system.display', 'activeTab'],
  }
});
