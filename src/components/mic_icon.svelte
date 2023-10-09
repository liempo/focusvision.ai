<script lang="ts">
	export let active: Boolean
</script>

<component>
	{#if active}
		<img
			class="h-6 w-6 bg-transparent"
			src="/icons/mic_on.svg"
			alt="Mic muted"
		/>
	{:else}
		<img
			class="h-6 w-6 bg-transparent"
			src="/icons/mic_off.svg"
			alt="Mic on"
		/>
	{/if}
</component>
