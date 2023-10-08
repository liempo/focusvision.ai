export const load = async ({ params }) => {
	const { slug } = params

	return {
		members: [
			{ name: 'Tony Stark' },
			{ name: 'Steve Rogers' },
			{ name: 'Bruce Banner' },
			{ name: 'Natasha Romanoff' },
			{ name: 'Clint Barton' },
			{ name: 'Thor Odinson' },
			{ name: 'Peter Parker' },
			{ name: 'Scott Lang' }
		]
	}
}
