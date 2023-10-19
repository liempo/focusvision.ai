import { writable } from 'svelte/store'
import { generateUID } from './utils'

export type Profile = {
	uid: number
	name?: string
	channel?: string
}

export const profileStore = writable<Profile>({
	uid: generateUID()
})
