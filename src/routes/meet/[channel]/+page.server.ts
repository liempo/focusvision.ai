import { env } from '$env/dynamic/private'
import { error } from '@sveltejs/kit'

import { RtcTokenBuilder, RtcRole } from 'agora-token'

type LoadOutput = {
	uid: number
	appId: string
	channel: string
	token: string
}

export const load = async ({ params: { channel } }): Promise<LoadOutput> => {
	if (!channel) {
		throw error(404, 'Invalid meeting')
	}

	const uid = 0
	const appId = env.VITE_AGORA_APP_ID
	const appCertificate = env.VITE_AGORA_APP_CERTIFICATE

	if (channel === env.VITE_AGORA_TEST_CHANNEL) {
		return {
			uid,
			appId,
			channel: env.VITE_AGORA_TEST_CHANNEL,
			token: env.VITE_AGORA_TEST_TOKEN
		}
	}

	const token = RtcTokenBuilder.buildTokenWithUid(
		appId, // appID,
		appCertificate, // appCertificate
		channel, // channelName
		uid, // uid
		RtcRole.PUBLISHER, // role
		600, // token_expire
		Math.floor(Date.now() / 1000) + 3600 // privilegeExpiredTs
	)

	console.log('Token generated for channel', channel, token)

	return {
		uid,
		appId,
		channel,
		token
	}
}
