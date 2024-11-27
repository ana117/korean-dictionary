import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				text: 'rgb(var(--text))',
				background: 'rgb(var(--background))',
				foreground: 'rgb(var(--foreground))',
				primary: 'rgb(var(--primary))',
				secondary: 'rgb(var(--secondary))',
				accent: 'rgb(var(--accent))'
			}
		}
	},

	plugins: []
} satisfies Config;
