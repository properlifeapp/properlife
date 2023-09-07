import { google } from 'googleapis'
import jwt from 'jsonwebtoken'
import base64url from 'base64url'
import fs from 'fs'
import { getUserData } from './utils/db'
import { PUBLIC_DOMAIN_CLIENT } from '$env/static/public'

// import privateKey from '$lib/jwt.key'
const privateKey = fs.readFileSync(`../client/src/lib/jwt.key`)
console.log(privateKey)


//initalize 0Auth2 google client
export const oauth2client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    `${PUBLIC_DOMAIN_CLIENT}/auth/callback/google`
)

//generate the url endpoint we will use to contact google
export const authUrl = oauth2client.generateAuthUrl({
    scope: [
        "openid",
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
    ]
})

// create and store authTokens
// seperate tokens for each client vs one token served to each?
// invalidate tokens based on how long it's been since theyve been used


//Stuff I copied from https://github.com/jchanes04/flashchem

export function generateToken(userId, time = '6h') {
    return jwt.sign({ userId }, privateKey, { algorithm: 'RS256', expiresIn: time })
}

export async function getUserFromToken(token) {
    try {
        let tokenPayload = jwt.verify(token, privateKey, { algorithms: ['RS256'] })
        console.log({ 'tokenPayload.userId': tokenPayload.userId })
        let userData = await getUserData(tokenPayload.userId)
        return userData || null
    } catch (e) {
        return null
    }
}

export function generateSignupHash(userId) {
    return base64url.encode(JSON.stringify({ userId, time: Date.now() }))
}

export function decryptSignupHash(hash) {
    try {
        let decoded = base64url.decode(hash)
        return JSON.parse(decoded)
    } catch {
        return null
    }
}