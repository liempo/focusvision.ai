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
			},
			keyframes: {
				// Create a keyframe that slide up
				slide: {
					'0%': {
						transform: 'translateY(120%)'
					},
					'100%': {
						transform: 'translateY(0)'
					}
				},

				grow: {
					// Clip path from bottom to top
					'0%': {
						clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)'
					},
					'100%': {
						clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
					}
				}
			},
			animation: {
				slide: 'slide 1.5s ease-in-out',
				grow: 'grow 1.5s ease-in-out'
			}
		}
	}
}
