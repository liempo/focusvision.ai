<script lang="ts">
	import { LottiePlayer } from '@lottiefiles/svelte-lottie-player'
</script>

<main>
	<div class="flex bg-brand-background h-screen items-center p-12">
		<div class="w-full md:w-1/2">
			<div
				class="text-5xl py-12 text-center select-none flex items-center justify-start gap-1"
			>
				<div class="p-1 font-extrabold bg-brand-primary text-white">FOCUS</div>
				<div class="text-brand-primary-dark">VISION</div>
			</div>
			<p class="text-lg w-2/3">
				A video conferencing application that uses AI to help you focus on the
				meeting.
			</p>
			<div class="flex items-center justify-start space-x-4 mt-8">
				<button class="px-4 py-2 bg-brand-primary text-white rounded-lg">
					New meeting
				</button>
				<p class="font-sans">or</p>
				<div>
					<input
						type="text"
						class="px-4 py-2 border border-gray-300 rounded-lg"
						placeholder="Enter a code or a link"
					/>
					<button class="px-4 py-2 bg-brand-primary text-white rounded-lg">
						Join
					</button>
				</div>
			</div>
		</div>
		<div class="p-8 hidden md:block">
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
