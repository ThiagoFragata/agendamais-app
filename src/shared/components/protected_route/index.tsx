'use client'

import { useAuth } from '@/shared/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

type Props = {
    children: React.ReactNode
    allowedRoles: string[]
}

export default function ProtectedRoute({ children, allowedRoles }: Props) {
    const { user, isAuthenticated } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (isAuthenticated && !allowedRoles.includes(user?.role || '')) {
            router.push('/unauthorized')
        }
    }, [user, isAuthenticated, allowedRoles, router])

    if (!isAuthenticated) return <p>Carregando...</p>

    return <>{children}</>
}
