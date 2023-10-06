<script lang="ts">
	import Banner from '@/components/banner.svelte'
	import { onMount } from 'svelte'

	let stream: MediaStream
	let videoRef: HTMLVideoElement

	let joinState = {
		name: '',
		isAudioRecording: false,
		isWebcamRecording: true
	}

	const getStream = async () => {
		try {
			stream = await navigator.mediaDevices.getUserMedia({
				video: true,
				audio: false
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

		<video
			class={` my-4 rounded-2xl shadow-xl ${
				stream ? 'animate-grow' : 'hidden'
			}`}
			width="640"
			height="480"
			autoplay={true}
			bind:this={videoRef}
		>
			<track kind="captions" />
		</video>

		<div
			class={`flex w-full items-center justify-between ${
				stream ? 'animate-slide' : 'hidden'
			}`}
		>
			<input
				bind:value={joinState.name}
				type="text"
				class="w-1/2 rounded-lg border border-gray-300 px-4 py-2"
				placeholder="Enter your name"
			/>

			<div class="grid grid-flow-col gap-2">
				<button
					on:click={() => {
						joinState.isAudioRecording = !joinState.isAudioRecording
					}}
					class="rounded-lg bg-brand-primary px-4 py-2 text-white hover:bg-brand-accent"
				>
					{#if joinState.isAudioRecording}
						<img
							class="h-6 w-6 bg-transparent"
							src="/icons/mic_muted.svg"
							alt="Mic muted"
						/>
					{:else}
						<img
							class="h-6 w-6 bg-transparent"
							src="/icons/mic_listening.svg"
							alt="Mic on"
						/>
					{/if}
				</button>

				<button
					class="rounded-lg bg-brand-primary px-4 py-2 text-white hover:bg-brand-accent disabled:bg-gray-500"
					disabled={!joinState.name}
				>
					Join
				</button>
			</div>
		</div>
	</div>
</main>
