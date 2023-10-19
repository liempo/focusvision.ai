import { error, redirect } from '@sveltejs/kit'
import { kv } from '@vercel/kv'

export const actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData()

		const uid = data.get('uid')?.toString()
		const isAudioOn = data.get('isAudioOn')?.toString()
		const isVideoOn = data.get('isVideoOn')?.toString()

		if (!(uid && isAudioOn && isVideoOn)) {
			throw error(401, 'Invalid cookies set')
		}

		cookies.set('uid', uid, { path: '/meet' })
		if (isAudioOn === 'true') cookies.set('audio', '1', { path: '/meet' })
		if (isAudioOn === 'true') cookies.set('video', '1', { path: '/meet' })

		const name = data.get('name')?.toString()
		const channel = data.get('channel')?.toString()

		if (!uid) {
			throw error(401, 'No valid uid')
		}

		if (!channel) {
			throw error(404, 'Invalid meeting')
		}

		if (!name) {
			throw error(404, 'Invalid name')
		}

		await kv.set(`name:${uid}`, name)
		throw redirect(303, `/meet/${channel}`)
	}
}
