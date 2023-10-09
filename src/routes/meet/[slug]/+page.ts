export const load = async ({ params }) => {
	const { slug } = params

	return {
		members: [
			{ name: 'Tony Stark', audio: true, video: true },
			{ name: 'Steve Rogers', audio: true, video: true },
			{ name: 'Bruce Banner', audio: true, video: true },
			{ name: 'Natasha Romanoff', audio: true, video: true },
			{ name: 'Clint Barton', audio: true, video: true },
			{ name: 'Thor Odinson', audio: true, video: true },
			{ name: 'Peter Parker', audio: true, video: true },
			{ name: 'Scott Lang', audio: true, video: true },
		]
	}
}
