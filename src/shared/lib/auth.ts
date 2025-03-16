import { verify } from 'jsonwebtoken'
import { cookies } from 'next/headers'

const SECRET = process.env.JWT_SECRET as string

export async function getUserFromToken() {
    const token = (await cookies()).get('access_token')?.value
    if (!token) return null

    try {
        const decoded = verify(token, SECRET) as unknown as { role: string }
        return decoded
    } catch {
        return null
    }
}
