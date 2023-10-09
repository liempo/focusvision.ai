<script lang="ts">
	export let active: boolean
	export let size: number = 24
</script>

<component>
	{#if active}
		<img
			width={size}
			height={size}
			src="/icons/video_on.svg"
			alt="Video off"
		/>
	{:else}
		<img
			width={size}
			height={size}
			src="/icons/video_off.svg"
			alt="Video on"
		/>
	{/if}
</component>
