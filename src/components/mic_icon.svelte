<script lang="ts">
	export let active: boolean
	export let size: number = 24
	export let redOnMute: boolean = false
</script>

<component>
	{#if active}
		<img
			width={size}
			height={size}
			src="/icons/mic_on.svg"
			alt="Mic muted"
		/>
	{:else}
		<img
			width={size}
			height={size}
			style={redOnMute
				? 'filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%);'
				: ''}
			src="/icons/mic_off.svg"
			alt="Mic on"
		/>
	{/if}
</component>
