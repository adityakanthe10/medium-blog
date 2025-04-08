import { jwtVerify, createRemoteJWKSet } from 'jose'

const JWKS = createRemoteJWKSet(
new URL('https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com')
)

const FIREBASE_PROJECT_ID = 'bloggle-5349f'

export async function verifyIdToken(idToken: string) {
  console.log("Verifying Firebase Token:", idToken)
    try {
    const { payload } = await jwtVerify(idToken, JWKS, {
      issuer: `https://securetoken.google.com/${FIREBASE_PROJECT_ID}`,
      audience: FIREBASE_PROJECT_ID
    })
    return payload
  } catch (error) {
    console.error("Invalid Firebase Token", error)
    throw new Error('Invalid Firebase Token')
  }
}
