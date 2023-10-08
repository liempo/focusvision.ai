export const load = async ({ params }) => {
	const { slug } = params
	return { meetingCode: slug }
}
