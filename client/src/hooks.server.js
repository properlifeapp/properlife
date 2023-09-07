
// import pool from "$lib/utils/db"

import { getUserFromToken } from "$lib/auth";
import { PUBLIC_DOMAIN_CLIENT } from '$env/static/public'

const authenticatedEndpoints = ["/"]

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    let authToken = event.request.headers.get('cookie')?.split("; ").find(x => x.split("=")[0] === "authToken")?.split("=")[1]
    if (authToken && !event.request.headers.get('Authorization')) event.request.headers.set('authorization', authToken)

    if (authenticatedEndpoints.some(e => event.url.pathname.startsWith(e))) {
        const user = await getUserFromToken(event.request.headers.get('Authorization'))
        console.log('in hooks handle', user)
        if (user) {
            event.locals.userData = user
        } else {
            return new Response(null, {
                status: 302,
                headers: {
                    'Location': `${PUBLIC_DOMAIN_CLIENT}/auth`
                }
            })
        }
    }

    return resolve(event)
}

export async function getSession({ request, locals }) {
    console.log('hi')
    console.log({ request, locals })
    let user = locals.userData || await getUserFromToken(request.headers.get('Authorization'))
    if (user) 
        return {
            loggedIn: true,
            userData: { ...user }
        }

    return {
        loggedIn: false
    }
}












// export const handle = SvelteKitAuth({
//     providers: [
//         GoogleProvider({
//             clientId: process.env.GOOGLE_CLIENT_ID,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET
//         })
//     ],
//     callbacks: {
//         async signIn({ account, profile }) {
//             if (account.provider === "google") {
//                 // return profile.email_verified && profile.email.endsWith("@mrc.org")
//                 console.log(profile._json)
//                 let conn
//                 let allow = false
//                 try {
//                     conn = await pool.getConnection()
//                     const rows = await conn.query(`SELECT gid FROM users WHERE email = '${profile._json.email}'`)
//                     if (rows.length) {
//                         if (!rows[0].gid) {
//                             // const resp = await conn.query('INSERT INTO users (email) values (?) ')
//                             const resp = await conn.query('UPDATE users SET gid = ?, name = ?, picture = ? WHERE email = ?', [
//                                 profile._json.sub,
//                                 profile._json.name,
//                                 profile._json.picture,
//                                 profile._json.email
//                             ])
//                             console.log(resp)
//                         }
//                         console.log('allow')
//                         allow = true
//                     }
//                 }
//                 catch (err) {
//                     console.error(err)
//                 }
//                 finally {
//                     if (conn) {
//                         console.log('ending db conn...')
//                         await conn.end()
//                     }
//                     console.log(allow)
//                     return 
//                 }
//             }
//             return false // Do different verification for other providers that don't have `email_verified`
//         },
//     }
// })