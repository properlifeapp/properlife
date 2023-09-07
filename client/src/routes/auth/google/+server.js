
import { authUrl } from '$lib/auth'
import { redirect } from '@sveltejs/kit'

// This file grabs the OAuth url from $lib/auth and redirects to the google sign in

export async function GET() {
    console.log(authUrl)
    throw redirect(302, authUrl)
}