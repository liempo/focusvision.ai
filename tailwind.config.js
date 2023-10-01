/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['DM Sans', 'sans-serif']
			},
			colors: {
				brand: {
					background: '#F6F8FE',
					primary: '#0a2463',
					accent: ' #3e92cc'
				}
			}
		}
	}
}
