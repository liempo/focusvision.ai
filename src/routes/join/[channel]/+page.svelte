<script lang="ts">
	import { onMount } from 'svelte'
	import { goto } from '$app/navigation'

	import { getInitials } from '@/lib/utils'
	import { prefStore, profileStore } from '@/lib/store'

	import Banner from '@/components/banner.svelte'
	import MicIcon from '@/components/mic_icon.svelte'
	import CameraIcon from '@/components/camera_icon.svelte'

	import type { PageData } from './$types'
	export let data: PageData

	let stream: MediaStream
	let videoRef: HTMLVideoElement

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
	<title>FocusVision | {data.channel}</title>
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
				class={`rounded-2xl shadow-xl ${!$prefStore.isVideoOn && 'opacity-0'}`}
				width="640"
				height="480"
				autoplay={true}
				muted={true}
				bind:this={videoRef}
			>
				<track kind="captions" />
			</video>

			{#if !$prefStore.isVideoOn}
				<div
					class="absolute left-0 top-0 flex h-full w-full rounded-2xl bg-white shadow-sm"
				>
					<div class="m-auto h-32 w-32 rounded-full bg-brand-accent">
						{#if $profileStore.name}
							<p class="text-center font-sans text-5xl text-white py-10">
								{getInitials($profileStore.name)}
							</p>
						{:else}
							<div class="w-16 h-full m-auto">
								<img
									class="w-full h-full"
									src="/icons/user.svg"
									alt="User Icon"
								/>
							</div>
						{/if}
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
				bind:value={$profileStore.name}
				type="text"
				class="w-1/2 rounded-lg border border-gray-300 px-4 py-2"
				placeholder="Enter your name"
			/>

			<div class="grid grid-flow-col gap-2">
				<button
					on:click={() => {
						$prefStore.isAudioOn = !$prefStore.isAudioOn
					}}
					class="rounded-lg bg-brand-primary px-4 py-2 text-white hover:bg-brand-accent"
				>
					<MicIcon active={$prefStore.isAudioOn} />
				</button>

				<button
					on:click={() => {
						$prefStore.isVideoOn = !$prefStore.isVideoOn
					}}
					class="rounded-lg bg-brand-primary px-4 py-2 text-white hover:bg-brand-accent"
				>
					<CameraIcon active={$prefStore.isVideoOn} />
				</button>

				<button
					on:click={() => {
						goto(`/meet/${data.channel}`)
					}}
					class="rounded-lg bg-brand-primary px-4 py-2 text-white hover:bg-brand-accent disabled:bg-gray-500"
					disabled={!$profileStore.name}
				>
					Join
				</button>
			</div>
		</div>
	</div>
</main>
