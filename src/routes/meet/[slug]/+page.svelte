<script lang="ts">
	import { getInitials } from '@/lib/utils'

	import Banner from '@/components/banner.svelte'
	import MicIcon from '@/components/mic_icon.svelte'

	import type { PageData } from './$types'
	export let data: PageData

	let meetingTitle = 'Machine Learning 101'
	let meetingMembersCount = 20
</script>

<main class="flex h-full min-h-screen flex-col bg-brand-background pb-12">
	<header class="mb-4 flex items-center justify-between px-4 py-2">
		<title class="flex items-center justify-start space-x-4 text-lg">
			<div class="hidden sm:block">
				<Banner />
			</div>
			<separator class="hidden h-10 w-px bg-gray-400 sm:block" />
			<h1 class="font-sans text-gray-700">{meetingTitle}</h1>
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
			>
				<svg
					width="24"
					height="24"
					viewBox="0 0 32 32"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M9.06676 10.6667C9.06676 8.89939 10.4994 7.46671 12.2668 7.46671C14.0341 7.46671 15.4668 8.89939 15.4668 10.6667C15.4668 12.434 14.0341 13.8667 12.2668 13.8667C10.4994 13.8667 9.06676 12.434 9.06676 10.6667ZM12.2668 5.33337C9.32124 5.33337 6.93343 7.72119 6.93343 10.6667C6.93343 13.6122 9.32124 16 12.2668 16C15.2123 16 17.6001 13.6122 17.6001 10.6667C17.6001 7.72119 15.2123 5.33337 12.2668 5.33337ZM8.00008 18.1334C6.58559 18.1334 5.22904 18.6953 4.22884 19.6954C3.22865 20.6956 2.66675 22.0522 2.66675 23.4667V25.6C2.66675 26.1891 3.14431 26.6667 3.73341 26.6667C4.32252 26.6667 4.80008 26.1891 4.80008 25.6V23.4667C4.80008 22.618 5.13722 21.8041 5.73734 21.2039C6.33746 20.6038 7.15139 20.2667 8.00008 20.2667H16.5334C17.3821 20.2667 18.196 20.6038 18.7962 21.2039C19.3963 21.8041 19.7334 22.618 19.7334 23.4667V25.6C19.7334 26.1891 20.211 26.6667 20.8001 26.6667C21.3892 26.6667 21.8667 26.1891 21.8667 25.6V23.4667C21.8667 22.0522 21.3048 20.6956 20.3046 19.6954C19.3045 18.6953 17.9479 18.1334 16.5334 18.1334H8.00008ZM22.9673 19.0721C23.1146 18.5017 23.6963 18.1587 24.2667 18.306C25.4109 18.6014 26.4246 19.2684 27.1486 20.2024C27.8725 21.1363 28.2659 22.2843 28.2667 23.466V25.6001C28.2667 26.1892 27.7892 26.6668 27.2001 26.6668C26.611 26.6668 26.1334 26.1892 26.1334 25.6001V23.4676C26.1328 22.7586 25.8968 22.0697 25.4625 21.5094C25.0281 20.949 24.4199 20.5488 23.7334 20.3716C23.163 20.2243 22.82 19.6425 22.9673 19.0721ZM19.998 5.50533C19.4273 5.35921 18.8462 5.70339 18.7001 6.27409C18.554 6.84478 18.8981 7.42587 19.4688 7.572C20.1572 7.74824 20.7673 8.14856 21.2029 8.70984C21.6386 9.27113 21.8751 9.96146 21.8751 10.672C21.8751 11.3825 21.6386 12.0729 21.2029 12.6341C20.7673 13.1954 20.1572 13.5958 19.4688 13.772C18.8981 13.9181 18.554 14.4992 18.7001 15.0699C18.8462 15.6406 19.4273 15.9848 19.998 15.8387C21.1452 15.5449 22.162 14.8777 22.8882 13.9422C23.6143 13.0068 24.0084 11.8562 24.0084 10.672C24.0084 9.48777 23.6143 8.33722 22.8882 7.40174C22.162 6.46626 21.1452 5.79906 19.998 5.50533Z"
						fill="#F5F9FF"
						fill-opacity="0.95"
					/>
				</svg>
				<p class="font-sans text-sm">{meetingMembersCount}</p>
			</button>
		</actions>
	</header>
	<div class="px-4 py-2 w-full gap-2 flex flex-wrap justify-center">
		{#each data.members as member}
			<div class="relative rounded-lg bg-white shadow-md h-96 w-96">
				{#if member.video}
					<img
						src="https://thispersondoesnotexist.com"
						alt="Video demo"
						class="h-full w-full object-cover rounded-lg"
					/>
				{:else}
					<div
						class="flex h-full w-full flex-col items-center justify-center gap-2"
					>
						<div
							class="flex h-32 w-32 items-center justify-center rounded-full bg-gray-200"
						>
							<p class="text-center font-sans text-5xl text-white">
								{getInitials(member.name)}
							</p>
						</div>
					</div>
				{/if}
				<div
					class="absolute bottom-0 left-0 flex items-center justify-start py-1 px-4 m-2 gap-2 bg-brand-primary bg-opacity-50 rounded-full"
				>
					<p class="text-md font-sans text-white">
						{member.name}
					</p>
					<MicIcon
						active={member.audio}
						size={20}
					/>
				</div>
			</div>
		{/each}
	</div>
</main>
