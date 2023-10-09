export const load = async ({ params }) => {
	const { slug } = params

	return {
		members: [
			{ name: 'Tony Stark', audio: true, video: true },
			{ name: 'Steve Rogers', audio: true, video: false },
			{ name: 'Bruce Banner', audio: true, video: false },
			{ name: 'Natasha Romanoff', audio: true, video: true },
			{ name: 'Clint Barton', audio: false, video: true },
			{ name: 'Thor Odinson', audio: true, video: true },
			{ name: 'Peter Parker', audio: true, video: false },
			{ name: 'Scott Lang', audio: true, video: true }
		]
	}
}
