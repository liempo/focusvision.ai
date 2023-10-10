import { env } from '$env/dynamic/private'
import { error, json } from '@sveltejs/kit'

import { RtcTokenBuilder, RtcRole } from 'agora-token'

export async function load({ params: { slug: channel }, url }) {
	const _new = url.searchParams.has('new')

	if (!channel) {
		throw error(404, 'Invalid meeting')
	}

	if (channel === env.VITE_AGORA_TEST_CHANNEL) {
		return {
			channel: env.VITE_AGORA_TEST_CHANNEL,
			token: env.VITE_AGORA_TEST_TOKEN
		}
	}

	const token = RtcTokenBuilder.buildTokenWithUid(
		env.VITE_AGORA_APP_ID, // appId
		env.VITE_AGORA_APP_CERTIFICATE, // appCertificate
		channel, // channelName
		0, // uid
		RtcRole.PUBLISHER, // role
		600, // token_expire
		Math.floor(Date.now() / 1000) + 3600 // privilegeExpiredTs
	)

	console.log('Token generated for channel', channel, token)

	return {
		channel,
		token
	}
}
