<script lang="ts">
	export let active: Boolean
</script>

<component>
	{#if active}
		<img
			class="h-6 w-6 bg-transparent"
			src="/icons/video_on.svg"
			alt="Video off"
		/>
	{:else}
		<img
			class="h-6 w-6 bg-transparent"
			src="/icons/video_off.svg"
			alt="Video on"
		/>
	{/if}
</component>
