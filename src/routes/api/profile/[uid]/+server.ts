import type { RequestHandler } from '@sveltejs/kit'
import { kv } from '@vercel/kv'

export const GET: RequestHandler = async ({
	params: { uid }
}): Promise<Response> => {
	const profile = await kv.get<string>(`name:${uid}`)
	return new Response(profile)
}
