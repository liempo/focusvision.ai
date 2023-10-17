<script lang="ts">
	import { onDestroy, onMount } from 'svelte'

	import { getInitials } from '@/lib/utils'
	import { prefStore, type Preferences } from '@/lib/store'

	import MicIcon from '@/components/mic_icon.svelte'
	import CameraIcon from '@/components/camera_icon.svelte'

	import AgoraRTC, {
		type IAgoraRTCClient,
		type IAgoraRTCRemoteUser,
		type ILocalAudioTrack,
		type ILocalVideoTrack
	} from 'agora-rtc-sdk-ng'

	export let uid: number
	export let appId: string
	export let channel: string
	export let token: string

	export let users: IAgoraRTCRemoteUser[] = []
	let audio: ILocalAudioTrack | null = null
	let video: ILocalVideoTrack | null = null

	let client: IAgoraRTCClient
	AgoraRTC.setLogLevel(4)
	client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' })
	const init = async () => {
		client.on('user-joined', async (user) => {
			console.log('user-joined', user.uid)
			users = [...users, user]
		})

		client.on('user-published', async (user, type) => {
			console.log('user-published', user.uid)
			users[users.findIndex((u) => u.uid === user.uid)] = user

			if (type === 'audio') {
				await client.subscribe(user, type)
				user.audioTrack?.play()
			} else if (type === 'video') {
				await client.subscribe(user, type)
				user.videoTrack?.play(`participant-video-${user.uid}`)
			}
		})

		client.on('user-unpublished', async (user, type) => {
			console.log('user-unpublished', user.uid)
			users[users.findIndex((u) => u.uid === user.uid)] = user

			if (type === 'audio') {
				user.audioTrack?.stop()
			} else if (type === 'video') {
				user.videoTrack?.stop()
			}
		})

		client.on('user-left', (u) => {
			users = users.filter((user) => user.uid !== u.uid)
		})

		await client.join(appId, channel, token, uid)
		;[audio, video] = await AgoraRTC.createMicrophoneAndCameraTracks()

		audio?.setEnabled($prefStore.isAudioOn)
		video?.setEnabled($prefStore.isVideoOn)
		video?.play('local-video')

		await client.publish([audio, video])
	}

	prefStore.subscribe(async (p: Preferences) => {
		console.log('Pref', p)
		await audio?.setEnabled(p.isAudioOn)
		await video?.setEnabled(p.isVideoOn)
	})

	onMount(async () => {
		await init()
	})

	onDestroy(() => {
		users = []
		audio?.close()
		video?.close()
		client.leave()
		client.removeAllListeners()
	})
</script>

<conference class="px-4 py-2 w-full gap-2 flex flex-wrap justify-center">
	<div class="relative rounded-lg bg-white shadow-md h-96 w-96">
		<video
			id="local-video"
			class={`h-full w-full object-cover rounded-lg ${
				$prefStore.isVideoOn ? 'block' : 'hidden'
			}`}
		>
			<track kind="captions" />
		</video>

		<div
			class={`flex h-full w-full flex-col items-center justify-center gap-2 ${
				$prefStore.isVideoOn ? 'hidden' : 'block'
			}`}
		>
			<div
				class="flex h-32 w-32 items-center justify-center rounded-full bg-gray-200"
			>
				<p class="text-center font-sans text-5xl text-white">
					{getInitials('A')}
				</p>
			</div>
		</div>
		<div
			class="absolute bottom-0 left-0 flex items-center justify-start py-1 px-4 m-2 gap-2 bg-brand-primary bg-opacity-50 rounded-full"
		>
			<p class="text-md font-sans text-white">
				{uid}
			</p>
			<MicIcon
				active={$prefStore.isAudioOn}
				size={20}
			/>
		</div>
	</div>

	{#each users as user}
		<div class="relative rounded-lg bg-white shadow-md h-96 w-96">
			<video
				id={`participant-video-${user.uid}`}
				class={`h-full w-full object-cover rounded-lg ${
					user.hasVideo ? 'block' : 'hidden'
				}`}
			>
				<track kind="captions" />
			</video>
			<div
				class={`flex h-full w-full flex-col items-center justify-center gap-2 ${
					user.hasVideo ? 'hidden' : 'block'
				}`}
			>
				<div
					class="flex h-32 w-32 items-center justify-center rounded-full bg-gray-200"
				>
					<p class="text-center font-sans text-5xl text-white">
						{getInitials('A')}
					</p>
				</div>
			</div>
			<div
				class="absolute bottom-0 left-0 flex items-center justify-start py-1 px-4 m-2 gap-2 bg-brand-primary bg-opacity-50 rounded-full"
			>
				<p class="text-md font-sans text-white">
					{user.uid}
				</p>
				<MicIcon
					active={user.hasAudio}
					size={20}
				/>
			</div>
		</div>
	{/each}
	<controls
		class="fixed bottom-4 left-4 gap-4 flex px-6 py-2 rounded-full bg-brand-accent bg-opacity-75"
	>
		<button
			on:click={() => {
				prefStore.update((p) => {
					let pref = p
					pref.isAudioOn = !pref.isAudioOn
					return pref
				})
			}}
		>
			<MicIcon
				active={$prefStore.isAudioOn}
				size={20}
			/>
		</button>
		<button
			on:click={() => {
				prefStore.update((p) => {
					let pref = p
					pref.isVideoOn = !pref.isVideoOn
					return pref
				})
			}}
		>
			<CameraIcon
				active={$prefStore.isVideoOn}
				size={20}
			/>
		</button>
	</controls>
</conference>
