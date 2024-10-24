/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors:{
				'misty-rose':'#f1dede',
				'puce':'#d496a7',
				'light-black':'#13151a',
				'wenge':'#5D576B',
				'pale-azure':'#6cd4ff',
				'coral-pink':'#fe938c'
			}
		},
	},
	plugins: [],
	darkMode: 'selector'
}
