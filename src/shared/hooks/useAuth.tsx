import { getCookie } from 'cookies-next/client'
import { jwtDecode } from 'jwt-decode'
import { useEffect, useState } from 'react'

type User = {
    id: string
    name: string
    email: string
    role: 'ADMIN' | 'OWNER' | 'EMPLOYEE' | 'CUSTOMER'
}

export function useAuth() {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const access_token = getCookie('access_token')

        if (access_token) {
            try {
                const decoded: User = jwtDecode(access_token)
                setUser(decoded)
            } catch {
                console.error('Token inválido')
            }
        }
    }, [])

    return { user, isAuthenticated: !!user }
}
