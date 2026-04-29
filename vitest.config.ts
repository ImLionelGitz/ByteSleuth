import { defineConfig } from 'vitest/config';
import { WxtVitest } from 'wxt/testing/vitest-plugin';

export default defineConfig({
  plugins: [WxtVitest()],
  test: {
    // Optional: Enables global API like 'describe' and 'it'
    globals: true,
    environment: 'jsdom', // or 'happy-dom'
  },
});
