import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from "node:path";
import tsconfigPaths from "vite-tsconfig-paths"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), tsconfigPaths()],
	resolve: {
	  alias: {
		  '@homework-app': path.resolve(__dirname, './src'),
		}
	},
	define: {
		__CWD__: JSON.stringify(process.cwd()),
	},
})
