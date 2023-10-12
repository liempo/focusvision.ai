<script lang="ts">
	import Banner from '@/components/banner.svelte'
	import { LottiePlayer } from '@lottiefiles/svelte-lottie-player'

	let joinCode: String = 'ajg-420-4ev'
</script>

<svelte:head>
	<title>FocusVision</title>
</svelte:head>

<main>
	<div
		class="flex h-screen items-center justify-center bg-brand-background p-12"
	>
		<div class="p-8">
			<div class="py-12 text-5xl">
				<Banner />
			</div>
			<p class="w-2/3 text-lg">
				A video conferencing application that uses AI to help you focus on the
				meeting.
			</p>
			<div
				class="mt-8 flex flex-col items-start justify-start gap-4 md:flex-row md:items-center"
			>
				<button
					class="rounded-lg bg-brand-primary px-4 py-2 text-white hover:bg-brand-accent disabled:bg-gray-500"
					disabled
				>
					New meeting
				</button>
				<p class="font-sans">or</p>
				<div>
					<input
						bind:value={joinCode}
						type="text"
						class="w-2/3 rounded-lg border border-gray-300 px-4 py-2"
						placeholder="Enter meeting code"
						disabled
					/>
					<a href={`/join/${joinCode}`}>
						<button
							class="rounded-lg bg-brand-primary px-4 py-2 text-white hover:bg-brand-accent disabled:bg-gray-500"
							disabled={!joinCode}
						>
							Join
						</button>
					</a>
				</div>
			</div>
		</div>
		<div class="hidden p-8 md:block">
			<LottiePlayer
				background="transparent"
				width={500}
				height={500}
				controls={false}
				controlsLayout={[]}
				autoplay
				loop
				src="/lottie/hero.json"
			/>
		</div>
	</div>
</main>
