<script lang="ts">
	import { LottiePlayer } from '@lottiefiles/svelte-lottie-player'
</script>

<main>
	<div class="flex bg-brand-background h-screen items-center justify-center p-12">
		<div class="p-8">
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
			<div class="flex flex-col md:flex-row items-start md:items-center justify-start gap-4 mt-8">
				<button class="px-4 py-2 bg-brand-primary text-white rounded-lg">
					New meeting
				</button>
				<p class="font-sans">or</p>
				<div>
					<input
						type="text"
						class="px-4 py-2 border border-gray-300 rounded-lg w-2/3"
						placeholder="Enter meeting code"
					/>
					<button class="px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-accent">
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
