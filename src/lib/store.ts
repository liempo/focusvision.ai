import { writable } from 'svelte/store'
import { generateUID } from './utils'

export type Profile = {
	uid: number
	name?: string
	channel?: string
}

export type Preferences = {
	isVideoOn: boolean
	isAudioOn: boolean
}

export const prefStore = writable<Preferences>({
	isVideoOn: true,
	isAudioOn: true
})

export const profileStore = writable<Profile>({
	uid: generateUID()
})
