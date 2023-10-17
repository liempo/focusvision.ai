import { env } from '$env/dynamic/private'
import { error } from '@sveltejs/kit'

import { get } from 'svelte/store'
import { profileStore } from '@/lib/store.js'

import pkg from 'agora-token'
import { parse } from 'svelte/compiler'
const { RtcTokenBuilder, RtcRole } = pkg

type LoadOutput = {
	uid: number
	appId: string
	channel: string
	token: string
}

export const load = async ({
	request,
	params: { channel }
}): Promise<LoadOutput> => {
	const cookie = request.headers.get('cookie')
	const uidStr = cookie
		? cookie
				.split(';')
				.find((str) => str.trim().startsWith('uid='))
				?.split('=')[1]
		: null

	if (!uidStr) {
		throw error(401, 'Invalid user')
	}

	if (!channel) {
		throw error(404, 'Invalid meeting')
	}

	const uid = parseInt(uidStr)
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
