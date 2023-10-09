<script lang="ts">
	import { onMount } from 'svelte'

	import Banner from '@/components/banner.svelte'
	import MicIcon from '@/components/mic_icon.svelte'
	import CameraIcon from '@/components/camera_icon.svelte'

	import type { PageData } from './$types'
	export let data: PageData

	let stream: MediaStream
	let videoRef: HTMLVideoElement

	let profile = {
		name: '',
		audio: true,
		video: true
	}

	const getStream = async () => {
		try {
			stream = await navigator.mediaDevices.getUserMedia({
				video: true,
				audio: true
			})
			videoRef.srcObject = stream
		} catch (err) {
			console.error(err)
		}
		console.log(stream.getTracks()[0])
	}

	const stopStream = async () => {
		stream.getTracks().forEach((track) => track.stop())
		videoRef.srcObject = null
	}

	onMount(() => {
		getStream()
		return () => stopStream()
	})
</script>

<svelte:head>
	<title>FocusVision | {data.meetingCode}</title>
</svelte:head>

<main class="flex h-screen flex-col bg-brand-background">
	<header class="flex items-center justify-between px-4 py-2">
		<title class="flex items-center justify-start space-x-4 text-lg">
			<Banner />
		</title>
	</header>

	<div class="m-auto transition ease-in-out">
		<div class={`${stream ? 'animate-slide' : 'hidden'}`}>
			<h1 class="font-sans text-3xl font-bold text-gray-700">Get Started</h1>
			<p class="font-sans text-xl text-gray-500">
				Setup your audio and profile before joining.
			</p>
		</div>

		<div class={`relative my-4 ${stream ? 'animate-grow' : 'hidden'}`}>
			<video
				class={`rounded-2xl shadow-xl ${!profile.video && 'opacity-0'}`}
				width="640"
				height="480"
				autoplay={true}
				muted={true}
				bind:this={videoRef}
			>
				<track kind="captions" />
			</video>

			{#if !profile.video}
				<div
					class="absolute left-0 top-0 flex h-full w-full rounded-2xl bg-white shadow-sm"
				>
					<div class="m-auto h-32 w-32 rounded-full bg-brand-accent p-10">
						<p class="text-center font-sans text-5xl text-white">
							{profile.name[0] ?? ''}
						</p>
					</div>
				</div>
			{/if}
		</div>
		<div
			class={`flex w-full items-center justify-between ${
				stream ? 'animate-slide' : 'hidden'
			}`}
		>
			<input
				bind:value={profile.name}
				type="text"
				class="w-1/2 rounded-lg border border-gray-300 px-4 py-2"
				placeholder="Enter your name"
			/>

			<div class="grid grid-flow-col gap-2">
				<button
					on:click={() => {
						profile.audio = !profile.audio
					}}
					class="rounded-lg bg-brand-primary px-4 py-2 text-white hover:bg-brand-accent"
				>
					<MicIcon active={profile.audio} />
				</button>

				<button
					on:click={() => {
						profile.video = !profile.video
					}}
					class="rounded-lg bg-brand-primary px-4 py-2 text-white hover:bg-brand-accent"
				>
					<CameraIcon active={profile.video} />
				</button>

				<button
					class="rounded-lg bg-brand-primary px-4 py-2 text-white hover:bg-brand-accent disabled:bg-gray-500"
					disabled={!profile.name}
				>
					Join
				</button>
			</div>
		</div>
	</div>
</main>
