/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}'
	],
	theme: {
		extend: {
			colors: {
			},
			fontSize: {
				8: '0.5rem',
				9: '0.5625rem',
				10: '0.625rem',
				11: '0.6875rem',
				12: '0.75rem',
				14: '0.875rem',
				16: '1rem',
				18: '1.125rem',
				20: '1.25rem',
				22: '1.375rem',
				24: '1.5rem',
				30: '1.875rem',
				32: '2rem',
				40: '2.5rem',
				48: '3rem',
				64: '4rem',
				80: '5rem',
				180: '11.25rem'
			}
		}
	},
	plugins: []
};