import { env } from '$env/dynamic/private'
import { error } from '@sveltejs/kit'

import { kv } from '@vercel/kv'

import pkg from 'agora-token'
const { RtcTokenBuilder, RtcRole } = pkg

type MeetingCookieData = {
	uid: number
	isAudioOn: boolean
	isVideoOn: boolean
}

type LoadOutput = {
	uid: number
	name: string
	appId: string
	channel: string
	token: string
	defaultAudioState: boolean
	defaultVideoState: boolean
}

export const load = async ({
	cookies,
	params: { channel }
}): Promise<LoadOutput> => {
	const uidStr = cookies.get('uid')
	if (!uidStr) throw error(401, 'Invalid cookies set')
	const cookie: MeetingCookieData = {
		uid: parseInt(uidStr),
		isAudioOn: cookies.get('audio') == '1',
		isVideoOn: cookies.get('video') == '1'
	}
	console.log('Cookie data', cookie)

	if (!channel) throw error(404, 'Invalid meeting')

	const { uid } = cookie
	const appId = env.VITE_AGORA_APP_ID
	const appCertificate = env.VITE_AGORA_APP_CERTIFICATE

	const name: string | null = await kv.get(`name:${uid}`)
	if (!name) {
		throw error(401, `${uid} not found`)
	}

	if (channel === env.VITE_AGORA_TEST_CHANNEL)
		return {
			uid,
			name,
			appId,
			channel: env.VITE_AGORA_TEST_CHANNEL,
			token: env.VITE_AGORA_TEST_TOKEN,
			defaultAudioState: cookie.isAudioOn,
			defaultVideoState: cookie.isVideoOn
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
		name,
		appId,
		channel,
		token,
		defaultAudioState: cookie.isAudioOn,
		defaultVideoState: cookie.isVideoOn
	}
}
