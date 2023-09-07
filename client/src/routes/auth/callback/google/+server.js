import { generateToken, oauth2client } from "$lib/auth";
import { confirmUserLogin } from '$lib/utils/db'
import { PUBLIC_DOMAIN_CLIENT } from '$env/static/public'

// This is where google sends us back to upon succesful authentication

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function GET({ url }) {

    //grab google code from redirect URL
    let code = url.searchParams.get('code')
    if (code) {
        //authentication and JWT shit...
        const { tokens } = await oauth2client.getToken(code)
        oauth2client.setCredentials(tokens)
        let { data: profileData } = await oauth2client.request({
            url: 'https://www.googleapis.com/oauth2/v1/userinfo',
            method: "GET"
        })

        console.log({ profileData })

        //Checks to see if the returned data from 
        //google is an allowed email in our Database
        let userData = await confirmUserLogin(profileData)
        console.log({ userData })

        if (userData) {


            //creates special token so we can identify this user/session
            let token = generateToken(userData.id)

            //upon all this success, redirect the user to the dashboard with 
            //thire special token set as a cookie header
            return new Response(null, {
                status: 302,
                headers: {
                    'Location': `${PUBLIC_DOMAIN_CLIENT}/`,
                    'Set-Cookie': `authToken=${token};Path=/;HttpOnly;`

                }
            })

        }
        else {
            return new Response(null, {
                status: 302,
                headers: {
                    'Location': `${PUBLIC_DOMAIN_CLIENT}/auth`,
                    'Set-Cookie': 'authToken=;Path=/;HttpOnly'
                }
            })
        }
    }
}