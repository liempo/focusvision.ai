import { writable } from 'svelte/store'

export type Preferences = {
	name: string
	isVideoOn: boolean
	isAudioOn: boolean
	currentChannel?: string
}

export const prefStore = writable<Preferences>({
	name: 'Anonymous',
	isVideoOn: false,
	isAudioOn: false
})
