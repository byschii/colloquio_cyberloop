import type { Config } from "tailwindcss"
import sharedConfig from "../../packages/ui/tailwind.config"

const config = {
  ...sharedConfig,
  content: [
    './pages/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
	],
} satisfies Config

export default config