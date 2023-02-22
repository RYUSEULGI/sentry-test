import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { sentryVitePlugin } from '@sentry/vite-plugin'

export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.

  return {
    build: {
      sourceRoot: '/',
      inlineSources: true,
      sourcemap: true, // Source map generation must be turned on
    },
    plugins: [
      react(),
      // Put the Sentry vite plugin after all other plugins
      sentryVitePlugin({
        org: 'none-9eu',
        project: 'test-project',
        // Specify the directory containing build artifacts
        include: './dist',

        // Auth tokens can be obtained from https://sentry.io/settings/account/api/auth-tokens/
        // and needs the `project:releases` and `org:read` scopes
        authToken:
          '563e6fbffd2946d2b6dbd5b7b34fb4167e7e3dab8433487eb73a3e0ab3db74aa',

        // Optionally uncomment the line below to override automatic release name detection
        release: 'test-project@1.0',
      }),
    ],
  }
})
