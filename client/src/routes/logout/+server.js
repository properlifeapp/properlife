import { PUBLIC_DOMAIN_CLIENT } from '$env/static/public'


// allows the user to logout
export async function GET() {
    return new Response(null, {
        status: 302,
        headers: {
            'Location': `${PUBLIC_DOMAIN_CLIENT}/auth`,
            'Set-Cookie': 'authToken=;Path=/;HttpOnly'
        }
    })
}