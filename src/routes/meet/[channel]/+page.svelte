<script lang="ts">
	import { onMount } from 'svelte'
	import { fly } from 'svelte/transition'

	import { getInitials } from '@/lib/utils'

	import Banner from '@/components/banner.svelte'
	import MicIcon from '@/components/mic_icon.svelte'
	import CameraIcon from '@/components/camera_icon.svelte'

	import type { IAgoraRTCRemoteUser } from 'agora-rtc-sdk-ng'

	import type { PageData } from './$types'
	export let data: PageData

	let Conference: typeof import('@/components/conference.svelte').default
	onMount(async () => {
		Conference = (await import('@/components/conference.svelte')).default
	})

	let users: IAgoraRTCRemoteUser[] = []
	let isParticipantsOpen = false
	let isAudioOn = data.defaultAudioState
	let isVideoOn = data.defaultVideoState
</script>

<svelte:head>
	<title>FocusVision | {data.channel}</title>
</svelte:head>

<main class="flex h-full min-h-screen flex-col bg-brand-background pb-12">
	<header class="mb-4 flex items-center justify-between px-4 py-2">
		<title class="flex items-center justify-start space-x-4 text-lg">
			<div class="hidden sm:block">
				<Banner />
			</div>
			<separator class="hidden h-10 w-px bg-gray-400 sm:block" />
			<h1 class="font-sans text-gray-700">{data.channel}</h1>
		</title>
		<actions class="flex items-center justify-end space-x-2">
			<button
				class="flex items-center space-x-2 rounded-lg bg-brand-primary px-4 py-2 text-white hover:bg-red-700"
			>
				<svg
					width="24"
					height="24"
					viewBox="0 0 32 32"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M15.9889 27.4531C22.2643 27.4531 27.444 22.2734 27.444 16.0091C27.444 9.74475 22.2533 4.56506 15.9779 4.56506C9.71354 4.56506 4.54492 9.74475 4.54492 16.0091C4.54492 22.2734 9.72461 27.4531 15.9889 27.4531ZM15.9889 25.1731C10.9089 25.1731 6.84701 21.0892 6.84701 16.0091C6.84701 10.929 10.9089 6.85608 15.9779 6.85608C21.0579 6.85608 25.1419 10.929 25.153 16.0091C25.1641 21.0892 21.069 25.1731 15.9889 25.1731ZM16 20.3476C18.4017 20.3476 20.3385 18.4108 20.3385 15.998C20.3385 13.6074 18.4017 11.6595 16 11.6595C13.5872 11.6595 11.6504 13.6074 11.6504 15.998C11.6504 18.4108 13.5872 20.3476 16 20.3476Z"
						fill="white"
						fill-opacity="0.98"
					/>
				</svg>
				<p class="hidden font-sans text-sm sm:block">Start Attendance</p>
			</button>

			<button
				class="h-max-fit flex items-center space-x-2 text-ellipsis rounded-lg bg-brand-primary px-4 py-2 text-white hover:bg-brand-accent"
				on:click={() => (isParticipantsOpen = !isParticipantsOpen)}
			>
				<img
					src="/icons/members.svg"
					alt="Members"
					class="h-6 w-6"
				/>
				<p class="font-sans text-sm">{users.length + 1}</p>
			</button>
		</actions>
	</header>

	<svelte:component
		this={Conference}
		{...data}
		bind:users
		bind:isAudioOn
		bind:isVideoOn
	/>

	<controls
		class="fixed bottom-4 left-4 gap-4 flex px-6 py-2 rounded-full bg-brand-accent bg-opacity-75"
	>
		<button
			on:click={() => {
				isAudioOn = !isAudioOn
			}}
		>
			<MicIcon
				active={isAudioOn}
				size={20}
			/>
		</button>
		<button
			on:click={() => {
				isVideoOn = !isVideoOn
			}}
		>
			<CameraIcon
				active={isVideoOn}
				size={20}
			/>
		</button>
	</controls>

	{#if isParticipantsOpen}
		<participants
			class="fixed top-0 right-0 bottom-0 mt-16 pb-4 px-4 w-full flex items-center justify-end"
			transition:fly={{ x: 100, duration: 200 }}
		>
			<div
				class="w-full sm:w-1/3 lg:w-1/6 h-full bg-white rounded-lg px-4 py-2 shadow-md"
			>
				<header class="flex justify-between items-center border-b py-2">
					<h2 class="font-sans text-gray-700 font-bold">Participants</h2>
					<svg
						class="cursor-pointer"
						width="12"
						height="12"
						viewBox="0 0 14 14"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						role="button"
						tabindex="0"
						on:click={() => (isParticipantsOpen = false)}
						on:keydown={(e) => {
							if (e.key === 'Escape') {
								isParticipantsOpen = false
							}
						}}
					>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M13.7071 1.70711C14.0976 1.31658 14.0976 0.683418 13.7071 0.292893C13.3166 -0.0976311 12.6834 -0.0976311 12.2929 0.292893L7 5.58579L1.70711 0.292893C1.31658 -0.0976311 0.683418 -0.0976311 0.292893 0.292893C-0.0976311 0.683418 -0.0976311 1.31658 0.292893 1.70711L5.58579 7L0.292893 12.2929C-0.0976311 12.6834 -0.0976311 13.3166 0.292893 13.7071C0.683418 14.0976 1.31658 14.0976 1.70711 13.7071L7 8.41421L12.2929 13.7071C12.6834 14.0976 13.3166 14.0976 13.7071 13.7071C14.0976 13.3166 14.0976 12.6834 13.7071 12.2929L8.41421 7L13.7071 1.70711Z"
							fill="#000"
							fill-opacity="0.75"
						/>
					</svg>
				</header>

				<ul class="flex flex-col divide-y divide">
					<div class="flex justify-between py-4">
						<div class="flex gap-2">
							<div
								class="flex h-6 w-6 items-center justify-center rounded-full bg-brand-accent"
							>
								<p class="text-center font-sans text-xs text-white">
									{getInitials('Test Account')}
								</p>
							</div>
							<p class="font-sans text-gray-700">
								{data.uid}
							</p>
						</div>
						<div
							class="flex items-center justify-center h-6 w-6 rounded-full bg-gray-500"
						>
							<MicIcon
								active={isAudioOn}
								size={16}
							/>
						</div>
					</div>
					{#each users as user}
						<div class="flex justify-between py-4">
							<div class="flex gap-2">
								<div
									class="flex h-6 w-6 items-center justify-center rounded-full bg-brand-accent"
								>
									<p class="text-center font-sans text-xs text-white">
										{getInitials('Test Account')}
									</p>
								</div>
								<p class="font-sans text-gray-700">
									{user.uid}
								</p>
							</div>
							<div
								class="flex items-center justify-center h-6 w-6 rounded-full bg-gray-500"
							>
								<MicIcon
									active={user.hasAudio}
									size={16}
								/>
							</div>
						</div>
					{/each}
				</ul>
			</div>
		</participants>
	{/if}
</main>
